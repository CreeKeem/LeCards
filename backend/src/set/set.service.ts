import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class SetService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto) {
    const set = await this.prisma.set.create({
      data: {
        user_id: dto.userId,
        name: dto.name,
        description: dto.description,
      },
    });

    return set;
  }

  async read(id: number) {
    try {
      const set = await this.prisma.set.findUnique({
        where: {
          set_id: id,
        },
      });

      if (!set) {
        throw new NotFoundException('Set does not exist');
      }

      return set;
    } catch (error) {
      throw new NotFoundException('Set does not exist');
    }
  }

  async update(set_id: number, dto: UpdateDto) {
    try {
      const set = await this.prisma.set.update({
        where: { set_id },
        data: dto,
      });

      return set;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Set does not exist');
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.set.delete({
        where: { set_id: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Set does not exist');
      }
      throw error;
    }
  }
}
