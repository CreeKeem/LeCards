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
        audio: dto.audio,
        video: dto.video,
        image: dto.image,
        set: { connect: { set_id: dto.set_id } },
      },
    });

    return flashcard;
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
      throw new NotFoundException('Flashcard does not exist');
    }
  }

  async update(dto: UpdateDto) {
    try {
      const { card_id, ...updateData } = dto;
      const flashcard = await this.prisma.flashcard.update({
        where: { card_id },
        data: updateData,
      });

      return flashcard;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Flashcard does not exist');
      }
      throw error;
    }
  }

  async read(id: number) {
    try {
      const flashcard = await this.prisma.flashcard.findUnique({
        where: {
          card_id: id,
        },
      });

      return flashcard;
    } catch (error) {
      throw new NotFoundException('Flashcard does not exist');
    }
  }
}
