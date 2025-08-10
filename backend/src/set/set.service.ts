import {
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';

@Injectable()
export class SetService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto, userId: number) {
    const set = await this.prisma.sets.create({
      data: {
        userId: userId,
        name: dto.name,
        description: dto.description,
      },
    });

    // Create corresponding UserSetInfo record
    await this.prisma.userSetInfo.create({
      data: {
        setId: set.setId,
        userId: userId,
        color: '#FDB927',
        cardsLearned: 0,
      },
    });

    return set;
  }

  async findOne(id: number, requestingUserId: number) {
    try {
      const set = await this.prisma.sets.findUnique({
        where: {
          setId: id,
        },
        include: {
          user: {
            select: {
              userId: true,
              fName: true,
              lName: true,
              email: true,
            },
          },
          UserSetInfo: {
            where: {
              userId: requestingUserId,
            },
          },
        },
      });

      if (!set) {
        throw new NotFoundException('Set does not exist');
      }

      // Check if user owns the set or has access to it
      if (set.userId !== requestingUserId) {
        throw new ForbiddenException('Access denied to this set');
      }

      return set;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      throw new NotFoundException('Set does not exist');
    }
  }

  async findUserSets(userId: number) {
    try {
      const sets = await this.prisma.sets.findMany({
        where: {
          userId,
        },
        include: {
          UserSetInfo: {
            where: {
              userId,
            },
          },
          _count: {
            select: {
              flashcards: true,
            },
          },
        },
        orderBy: {
          createdAt: 'desc',
        },
      });

      // Update numCards for each set
      const updatedSets = await Promise.all(
        sets.map(async (set) => {
          if (set._count.flashcards !== set.numCards) {
            await this.prisma.sets.update({
              where: { setId: set.setId },
              data: { numCards: set._count.flashcards },
            });
          }
          return {
            ...set,
            numCards: set._count.flashcards,
          };
        }),
      );

      return updatedSets;
    } catch (error) {
      throw new NotFoundException('Sets do not exist');
    }
  }

  async update(dto: UpdateDto, requestingUserId: number) {
    try {
      // First check if the set exists and user owns it
      const existingSet = await this.prisma.sets.findUnique({
        where: { setId: dto.setId },
      });

      if (!existingSet) {
        throw new NotFoundException('Set does not exist');
      }

      if (existingSet.userId !== requestingUserId) {
        throw new ForbiddenException('Access denied to this set');
      }

      const set = await this.prisma.sets.update({
        where: { setId: dto.setId },
        data: {
          name: dto.name,
          description: dto.description,
          numCards: dto.numCards,
        },
      });

      return set;
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('Set does not exist');
      }
      throw error;
    }
  }

  async delete(id: number, requestingUserId: number) {
    try {
      // First check if the set exists and user owns it
      const existingSet = await this.prisma.sets.findUnique({
        where: { setId: id },
      });

      if (!existingSet) {
        throw new NotFoundException('Set does not exist');
      }

      if (existingSet.userId !== requestingUserId) {
        throw new ForbiddenException('Access denied to this set');
      }

      // Delete the set (cascade will handle related records)
      return await this.prisma.sets.delete({
        where: { setId: id },
      });
    } catch (error) {
      if (error instanceof ForbiddenException) {
        throw error;
      }
      if (error.code === 'P2025') {
        throw new NotFoundException('Set does not exist');
      }
      throw error;
    }
  }

  async findUserSetCount(userId: number) {
    try {
      return await this.prisma.sets.count({
        where: { userId },
      });
    } catch (error) {
      throw new NotFoundException('Unable to count sets');
    }
  }
}
