import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';
import { LearningStatus } from '@prisma/client';

@Injectable()
export class UserCardInfoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto, requestingUserId: number) {
    // Verify that the flashcard exists and user owns the set
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { cardId: dto.cardId },
      include: {
        set: {
          select: {
            userId: true,
          },
        },
      },
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard does not exist');
    }

    if (flashcard.set.userId !== requestingUserId) {
      throw new ForbiddenException('Access denied to this flashcard');
    }

    const userCardInfo = await this.prisma.userCardInfo.create({
      data: {
        userId: requestingUserId,
        cardId: dto.cardId,
        favorite: dto.favorite || false,
        learningStatus: dto.learningStatus || LearningStatus.NOT_LEARNED,
        lastReviewed: dto.lastReviewed || new Date(),
      },
    });

    return userCardInfo;
  }

  async findOne(userId: number, cardId: number) {
    const userCardInfo = await this.prisma.userCardInfo.findUnique({
      where: {
        cardId_userId: {
          userId: userId,
          cardId: cardId,
        },
      },
      include: {
        flashcard: {
          include: {
            set: {
              select: {
                userId: true,
                name: true,
              },
            },
          },
        },
      },
    });

    if (!userCardInfo) {
      throw new NotFoundException('UserCardInfo not found');
    }

    // Verify user owns the set containing this flashcard
    if (userCardInfo.flashcard.set.userId !== userId) {
      throw new ForbiddenException('Access denied to this flashcard');
    }

    return userCardInfo;
  }

  async findSet(userId: number, setId: number) {
    // First verify that the user owns the set
    const set = await this.prisma.sets.findUnique({
      where: { setId },
    });

    if (!set) {
      throw new NotFoundException('Set does not exist');
    }

    if (set.userId !== userId) {
      throw new ForbiddenException('Access denied to this set');
    }

    const userCardInfos = await this.prisma.userCardInfo.findMany({
      where: {
        userId,
        flashcard: {
          setId,
        },
      },
      include: {
        flashcard: {
          select: {
            cardId: true,
            term: true,
            definition: true,
            contentDefinition: true,
            audioDefinition: true,
            contentTerm: true,
            audioTerm: true,
          },
        },
      },
      orderBy: {
        lastReviewed: 'asc',
      },
    });

    return userCardInfos;
  }

  async update(dto: UpdateDto, userId: number) {
    try {
      // First verify that the user card info exists and user owns the flashcard
      const existingUserCardInfo = await this.prisma.userCardInfo.findUnique({
        where: {
          cardId_userId: {
            userId: userId,
            cardId: dto.cardId,
          },
        },
        include: {
          flashcard: {
            include: {
              set: {
                select: {
                  userId: true,
                },
              },
            },
          },
        },
      });

      if (!existingUserCardInfo) {
        throw new NotFoundException('UserCardInfo does not exist');
      }

      if (existingUserCardInfo.flashcard.set.userId !== userId) {
        throw new ForbiddenException('Access denied to this flashcard');
      }

      const userCardInfo = await this.prisma.userCardInfo.update({
        where: {
          cardId_userId: {
            userId: userId,
            cardId: dto.cardId,
          },
        },
        data: {
          favorite: dto.favorite,
          learningStatus: dto.learningStatus,
          lastReviewed: dto.lastReviewed || new Date(),
        },
      });

      // Update user's progress statistics if learning status changed
      if (
        dto.learningStatus &&
        dto.learningStatus !== existingUserCardInfo.learningStatus
      ) {
        await this.updateUserProgressStats(
          userId,
          dto.learningStatus,
          existingUserCardInfo.learningStatus,
        );
      }

      return userCardInfo;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('UserCardInfo does not exist');
      }
      throw error;
    }
  }

  async delete(userId: number, cardId: number) {
    try {
      // First verify that the user card info exists and user owns the flashcard
      const existingUserCardInfo = await this.prisma.userCardInfo.findUnique({
        where: {
          cardId_userId: {
            userId: userId,
            cardId: cardId,
          },
        },
        include: {
          flashcard: {
            include: {
              set: {
                select: {
                  userId: true,
                },
              },
            },
          },
        },
      });

      if (!existingUserCardInfo) {
        throw new NotFoundException('UserCardInfo does not exist');
      }

      if (existingUserCardInfo.flashcard.set.userId !== userId) {
        throw new ForbiddenException('Access denied to this flashcard');
      }

      await this.prisma.userCardInfo.delete({
        where: {
          cardId_userId: {
            userId: userId,
            cardId: cardId,
          },
        },
      });

      return { message: 'UserCardInfo deleted successfully' };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('UserCardInfo does not exist');
      }
      throw error;
    }
  }

  async findUserMasteredCardCount(userId: number) {
    const masteredCount = await this.prisma.userCardInfo.count({
      where: {
        userId,
        learningStatus: LearningStatus.MASTERED,
      },
    });
    return masteredCount;
  }

  async findLearningStatusCounts(userId: number) {
    const [notLearned, learning, mastered] = await Promise.all([
      this.prisma.userCardInfo.count({
        where: { userId, learningStatus: LearningStatus.NOT_LEARNED },
      }),
      this.prisma.userCardInfo.count({
        where: { userId, learningStatus: LearningStatus.LEARNING },
      }),
      this.prisma.userCardInfo.count({
        where: { userId, learningStatus: LearningStatus.MASTERED },
      }),
    ]);

    return {
      notLearned,
      learning,
      mastered,
      total: notLearned + learning + mastered,
    };
  }

  async findUserFavoriteCards(userId: number) {
    const favoriteCards = await this.prisma.userCardInfo.findMany({
      where: {
        userId,
        favorite: true,
      },
      include: {
        flashcard: {
          include: {
            set: {
              select: {
                setId: true,
                name: true,
              },
            },
          },
        },
      },
      orderBy: {
        lastReviewed: 'desc',
      },
    });

    return favoriteCards;
  }

  private async updateUserProgressStats(
    userId: number,
    newStatus: LearningStatus,
    oldStatus: LearningStatus,
  ) {
    if (
      newStatus === LearningStatus.MASTERED &&
      oldStatus !== LearningStatus.MASTERED
    ) {
      // Increment correct count when a card is mastered
      await this.prisma.users.update({
        where: { userId },
        data: {
          correct: {
            increment: 1,
          },
        },
      });
    } else if (
      oldStatus === LearningStatus.MASTERED &&
      newStatus !== LearningStatus.MASTERED
    ) {
      // Decrement correct count when a mastered card is no longer mastered
      await this.prisma.users.update({
        where: { userId },
        data: {
          correct: {
            decrement: 1,
          },
        },
      });
    }

    // Always increment cardStudied when status changes (indicates review activity)
    await this.prisma.users.update({
      where: { userId },
      data: {
        cardStudied: {
          increment: 1,
        },
      },
    });
  }
}
