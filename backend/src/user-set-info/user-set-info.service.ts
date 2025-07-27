import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDto, UpdateDto } from './dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserSetInfoService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateDto) {
    const userSetInfo = await this.prisma.userSetInfo.create({
      data: {
        userId: dto.userId,
        setId: dto.setId,
      },
    });

    return userSetInfo;
  }

  async findOne(userId: number, setId: number) {
    const userSetInfo = await this.prisma.userSetInfo.findUnique({
      where: {
        setId_userId: {
          userId,
          setId,
        },
      },
    });

    if (!userSetInfo) {
      throw new NotFoundException('UserCardInfo not found');
    }
    return userSetInfo;
  }

  async findSet(userId: number) {
    const userSetInfos = await this.prisma.userSetInfo.findMany({
      where: {
        userId,
      },
    });

    if (!userSetInfos) {
      throw new NotFoundException('UserCardInfos not found');
    }

    return userSetInfos;
  }

  async update(dto: UpdateDto) {
    try {
      const userSetInfo = await this.prisma.userSetInfo.update({
        where: {
          setId_userId: {
            userId: dto.userId,
            setId: dto.setId,
          },
        },
        data: dto,
      });

      return userSetInfo;
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('userSetInfo does not exist');
      }
      throw error;
    }
  }

  async delete(userId: number, setId: number) {
    try {
      const userSetInfo = await this.prisma.userSetInfo.delete({
        where: {
          setId_userId: {
            userId: userId,
            setId: setId,
          },
        },
      });
    } catch (error) {
      if (error.code === 'P2025') {
        throw new NotFoundException('userSetInfo does not exist');
      }
      throw error;
    }
  }
}
