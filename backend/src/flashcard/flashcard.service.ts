import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { FlashcardDto } from './dto';
import { NotFoundError } from 'rxjs';

@Injectable()
export class FlashcardService {
  constructor(private prisma: PrismaService) {}

  async create(dto: FlashcardDto) {
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
}
