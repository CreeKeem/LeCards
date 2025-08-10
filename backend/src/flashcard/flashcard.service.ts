import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';
import { LearningStatus } from '@prisma/client';

@Injectable()
export class FlashcardService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto, requestingUserId: number) {
    // First verify that the user owns the set
    const set = await this.prisma.sets.findUnique({
      where: { setId: dto.setId },
    });

    if (!set) {
      throw new NotFoundException('Set does not exist');
    }

    if (set.userId !== requestingUserId) {
      throw new ForbiddenException('Access denied to this set');
    }

    const flashcard = await this.prisma.flashcard.create({
      data: {
        term: dto.term,
        definition: dto.definition,
        audioDefinition: dto.audioDefinition,
        contentDefinition: dto.contentDefinition,
        audioTerm: dto.audioTerm,
        contentTerm: dto.contentTerm,
        set: { connect: { setId: dto.setId } },
      },
    });

    // Create UserCardInfo for the flashcard
    await this.prisma.userCardInfo.create({
      data: {
        cardId: flashcard.cardId,
        userId: requestingUserId,
        favorite: false,
        learningStatus: LearningStatus.NOT_LEARNED,
      },
    });

    // Update set's card count
    await this.prisma.sets.update({
      where: { setId: dto.setId },
      data: {
        numCards: {
          increment: 1,
        },
      },
    });

    return flashcard;
  }

  async findOne(id: number, requestingUserId: number) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { cardId: id },
      include: {
        set: {
          select: {
            userId: true,
            setId: true,
            name: true,
          },
        },
        userCardInfo: {
          where: {
            userId: requestingUserId,
          },
        },
      },
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard does not exist');
    }

    // Check if user owns the set containing this flashcard
    if (flashcard.set.userId !== requestingUserId) {
      throw new ForbiddenException('Access denied to this flashcard');
    }

    return flashcard;
  }

  async findSetCards(setId: number, requestingUserId: number) {
    // First verify that the user owns the set
    const set = await this.prisma.sets.findUnique({
      where: { setId },
    });

    if (!set) {
      throw new NotFoundException('Set does not exist');
    }

    if (set.userId !== requestingUserId) {
      throw new ForbiddenException('Access denied to this set');
    }

    const flashcards = await this.prisma.flashcard.findMany({
      where: { setId },
      include: {
        userCardInfo: {
          where: {
            userId: requestingUserId,
          },
        },
      },
      orderBy: {
        cardId: 'asc',
      },
    });

    return flashcards;
  }

  async update(dto: UpdateDto, requestingUserId: number) {
    try {
      // First check if the flashcard exists and user owns it
      const existingFlashcard = await this.prisma.flashcard.findUnique({
        where: { cardId: dto.cardId },
        include: {
          set: {
            select: {
              userId: true,
            },
          },
        },
      });

      if (!existingFlashcard) {
        throw new NotFoundException('Flashcard does not exist');
      }

      if (existingFlashcard.set.userId !== requestingUserId) {
        throw new ForbiddenException('Access denied to this flashcard');
      }

      const flashcard = await this.prisma.flashcard.update({
        where: { cardId: dto.cardId },
        data: {
          term: dto.term,
          definition: dto.definition,
          audioDefinition: dto.audioDefinition,
          contentDefinition: dto.contentDefinition,
          audioTerm: dto.audioTerm,
          contentTerm: dto.contentTerm,
        },
      });

      return flashcard;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('Flashcard does not exist');
      }
      throw error;
    }
  }

  async delete(id: number, requestingUserId: number) {
    try {
      // First check if the flashcard exists and user owns it
      const existingFlashcard = await this.prisma.flashcard.findUnique({
        where: { cardId: id },
        include: {
          set: {
            select: {
              userId: true,
              setId: true,
            },
          },
        },
      });

      if (!existingFlashcard) {
        throw new NotFoundException('Flashcard does not exist');
      }

      if (existingFlashcard.set.userId !== requestingUserId) {
        throw new ForbiddenException('Access denied to this flashcard');
      }

      const flashcard = await this.prisma.flashcard.delete({
        where: {
          cardId: id,
        },
      });

      // Update set's card count
      await this.prisma.sets.update({
        where: { setId: existingFlashcard.set.setId },
        data: {
          numCards: {
            decrement: 1,
          },
        },
      });

      return flashcard;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('Flashcard does not exist');
      }
      throw error;
    }
  }

  async findUserCardCount(userId: number) {
    const cardCount = await this.prisma.userCardInfo.count({
      where: { userId },
    });

    return { count: cardCount };
  }
}
