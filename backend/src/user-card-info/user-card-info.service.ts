import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';
import { NotFoundException } from '@nestjs/common';
import { LearningStatus } from '@prisma/client';

@Injectable()
export class UserCardInfoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto) {
    const userCardInfo = await this.prisma.userCardInfo.create({
      data: {
        userId: dto.userId,
        cardId: dto.cardId,
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
    });

    if (!userCardInfo) {
      throw new NotFoundException('UserCardInfo not found');
    }
    return userCardInfo;
  }

  async findSet(userId: number, setId: number) {
    const userCardInfos = await this.prisma.userCardInfo.findMany({
      where: {
        userId,
        flashcard: {
          setId,
        },
      },
    });

    if (!userCardInfos) {
      throw new NotFoundException('UserCardInfos not found');
    }

    return userCardInfos;
  }

  async update(dto: UpdateDto) {
    try {
      const userCardInfo = await this.prisma.userCardInfo.update({
        where: {
          cardId_userId: {
            userId: dto.userId,
            cardId: dto.cardId,
          },
        },
        data: dto,
      });

      return userCardInfo;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('userCardInfo does not exist');
      }
      throw error;
    }
  }

  async delete(userId: number, cardId: number) {
    try {
      const userCardInfo = await this.prisma.userCardInfo.delete({
        where: {
          cardId_userId: {
            userId: userId,
            cardId: cardId,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('userCardInfo does not exist');
      }
      throw error;
    }
  }

  async findUserMasteredCardCount(userId: number) {
    const userCardInfo = await this.prisma.userCardInfo.count({
      where: {
        userId,
        learningStatus: LearningStatus.MASTERED
      },
    });
    return userCardInfo;
  }
}
