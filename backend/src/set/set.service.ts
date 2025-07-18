import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class SetService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto) {
    const sets = await this.prisma.sets.create({
      data: {
        userId: dto.userId,
        name: dto.name,
        description: dto.description,
        color: dto.color
      },
    });

    return sets;
  }

  async findOne(id: number) {
    try {
      const sets = await this.prisma.sets.findUnique({
        where: {
          setId: id,
        },
      });

      if (!sets) {
        throw new NotFoundException('Sets does not exist');
      }

      return sets;
    } catch (error) {
      throw new NotFoundException('Sets does not exist');
    }
  }

  async findUserSets(userId: number) {
    try {
      const sets = await this.prisma.sets.findMany({
        where: {
          userId,
        },
      });

      if (!sets) {
        throw new NotFoundException('Sets does not exist');
      }

      return sets;
    } catch (error) {
      throw new NotFoundException('Sets does not exist');
    }
  }

  async update(setId: number, dto: UpdateDto) {
    try {
      const sets = await this.prisma.sets.update({
        where: { setId },
        data: dto,
      });

      return sets;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Sets does not exist');
      }
      throw error;
    }
  }

  async delete(id: number) {
    try {
      return await this.prisma.sets.delete({
        where: { setId: id },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('Sets does not exist');
      }
      throw error;
    }
  }
}
