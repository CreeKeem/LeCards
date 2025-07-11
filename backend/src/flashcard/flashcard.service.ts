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
        audio_definition: dto.audioDefinition,
        content_definition: dto.contentDefinition,
        audio_term: dto.audioTerm,
        content_term: dto.contentTerm,
        set: { connect: { set_id: dto.setId } },
      },
    });

    return flashcard;
  }

  async read(id: number) {
    const flashcard = await this.prisma.flashcard.findUnique({
      where: { card_id: id },
    });

    if (!flashcard) {
      throw new NotFoundException('Flashcard does not exist');
    }

    return flashcard;
  }

  async update(card_id: number, dto: UpdateDto) {
    try {
      const flashcard = await this.prisma.flashcard.update({
        where: { card_id },
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
          card_id: id,
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
