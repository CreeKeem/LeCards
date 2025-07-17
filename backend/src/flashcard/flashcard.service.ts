import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class FlashcardService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto) {
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

    return flashcard;
  }

  async findOne(id: number) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { cardId: id },
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard does not exist');
    }

    return flashcard;
  }

  async findSetCards(setId: number) {
    const flashcards = await this.prisma.flashcard.findMany({
      where: { setId },
    });

    if (!flashcards) {
      throw new NotFoundException('Flashcards do not exist for set');
    }

    return flashcards;
  }

  async update(cardId: number, dto: UpdateDto) {
    try {
      const flashcard = await this.prisma.flashcard.update({
        where: { cardId },
        data: dto,
      });

      return flashcard;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Flashcard does not exist');
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      const flashcard = await this.prisma.flashcard.delete({
        where: {
          cardId: id,
        },
      });

      return flashcard;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Flashcard does not exist');
      }
      throw error;
    }
  }
}
