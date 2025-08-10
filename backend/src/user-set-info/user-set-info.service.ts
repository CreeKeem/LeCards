import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class UserSetInfoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto, userId: number) {
    // Verify that the set exists and user owns it
    const set = await this.prisma.sets.findUnique({
      where: { setId: dto.setId },
    });

    if (!set) {
      throw new NotFoundException('Set does not exist');
    }

    if (set.userId !== userId) {
      throw new ForbiddenException('Access denied to this set');
    }

    const userSetInfo = await this.prisma.userSetInfo.create({
      data: {
        userId: userId,
        setId: dto.setId,
        color: dto.color || '#FDB927',
        cardsLearned: dto.cardsLearned || 0,
        lastAccess: dto.lastAccess || new Date(),
      },
    });

    return userSetInfo;
  }

  async findOne(userId: number, setId: number) {
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

    const userSetInfo = await this.prisma.userSetInfo.findUnique({
      where: {
        setId_userId: {
          userId,
          setId,
        },
      },
      include: {
        sets: {
          select: {
            setId: true,
            name: true,
            description: true,
            numCards: true,
            createdAt: true,
          },
        },
      },
    });

    if (!userSetInfo) {
      throw new NotFoundException('UserSetInfo not found');
    }

    return userSetInfo;
  }

  async findUserSetInfos(userId: number) {
    const userSetInfos = await this.prisma.userSetInfo.findMany({
      where: {
        userId,
      },
      include: {
        sets: {
          select: {
            setId: true,
            name: true,
            description: true,
            numCards: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        lastAccess: 'desc',
      },
    });

    return userSetInfos;
  }

  async update(dto: UpdateDto, userId: number) {
    try {
      // First verify that the user set info exists and user owns the set
      const existingUserSetInfo = await this.prisma.userSetInfo.findUnique({
        where: {
          setId_userId: {
            userId: userId,
            setId: dto.setId,
          },
        },
        include: {
          sets: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!existingUserSetInfo) {
        throw new NotFoundException('UserSetInfo does not exist');
      }

      if (existingUserSetInfo.sets.userId !== userId) {
        throw new ForbiddenException('Access denied to this set');
      }

      const userSetInfo = await this.prisma.userSetInfo.update({
        where: {
          setId_userId: {
            userId: userId,
            setId: dto.setId,
          },
        },
        data: {
          color: dto.color,
          cardsLearned: dto.cardsLearned,
          lastAccess: dto.lastAccess || new Date(),
        },
      });

      return userSetInfo;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('UserSetInfo does not exist');
      }
      throw error;
    }
  }

  async delete(userId: number, setId: number) {
    try {
      // First verify that the user set info exists and user owns the set
      const existingUserSetInfo = await this.prisma.userSetInfo.findUnique({
        where: {
          setId_userId: {
            userId: userId,
            setId: setId,
          },
        },
        include: {
          sets: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!existingUserSetInfo) {
        throw new NotFoundException('UserSetInfo does not exist');
      }

      if (existingUserSetInfo.sets.userId !== userId) {
        throw new ForbiddenException('Access denied to this set');
      }

      await this.prisma.userSetInfo.delete({
        where: {
          setId_userId: {
            userId: userId,
            setId: setId,
          },
        },
      });

      return { message: 'UserSetInfo deleted successfully' };
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('UserSetInfo does not exist');
      }
      throw error;
    }
  }

  async getRecentSets(userId: number) {
    const recentSets = await this.prisma.userSetInfo.findMany({
      where: {
        userId,
      },
      include: {
        sets: {
          select: {
            setId: true,
            name: true,
            description: true,
            numCards: true,
            createdAt: true,
          },
        },
      },
      orderBy: {
        lastAccess: 'desc',
      },
      take: 10, // Limit to 10 most recent sets
    });

    return recentSets;
  }

  async updateLastAccess(userId: number, setId: number) {
    try {
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

      const userSetInfo = await this.prisma.userSetInfo.update({
        where: {
          setId_userId: {
            userId,
            setId,
          },
        },
        data: {
          lastAccess: new Date(),
        },
      });

      return userSetInfo;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('UserSetInfo does not exist');
      }
      throw error;
    }
  }

  async updateCardsLearned(userId: number, setId: number) {
    try {
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

      // Count mastered cards in this set
      const masteredCount = await this.prisma.userCardInfo.count({
        where: {
          userId,
          learningStatus: 'MASTERED',
          flashcard: {
            setId,
          },
        },
      });

      const userSetInfo = await this.prisma.userSetInfo.update({
        where: {
          setId_userId: {
            userId,
            setId,
          },
        },
        data: {
          cardsLearned: masteredCount,
        },
      });

      return userSetInfo;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('UserSetInfo does not exist');
      }
      throw error;
    }
  }
}
