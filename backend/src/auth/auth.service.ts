import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signup(dto: SignUpDto, rememberMe: boolean = false): Promise<Tokens> {
    const hash = await argon.hash(dto.password);

    try {
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          fName: dto.fName,
          lName: dto.lName,
          password: hash,
        },
        select: {
          userId: true,
          email: true,
          fName: true,
          lName: true,
        },
      });

      const tokens = await this.getTokens(
        user.userId,
        user.email,
        user.fName,
        user.lName,
        rememberMe,
      );

      await this.updateRtHash(user.userId, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SignInDto, rememberMe: boolean = false): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const pwMatches = await argon.verify(user.password, dto.password);

    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    const tokens = await this.getTokens(
      user.userId,
      user.email,
      user.fName,
      user.lName,
      rememberMe,
    );

    await this.updateRtHash(user.userId, tokens.refresh_token);

    return tokens;
  }

  async logout(userId: number): Promise<boolean> {
    await this.prisma.users.updateMany({
      where: {
        userId: userId,
        hashedRt: {
          not: null,
        },
      },
      data: {
        hashedRt: null,
      },
    });
    return true;
  }

  async refreshTokens(
    userId: number,
    rt: string,
    rememberMe: boolean = false,
  ): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: userId,
      },
    });

    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    const tokens = await this.getTokens(
      user.userId,
      user.email,
      user.fName,
      user.lName,
      rememberMe,
    );

    await this.updateRtHash(user.userId, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userId: number, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.users.update({
      where: {
        userId: userId,
      },
      data: {
        hashedRt: hash,
      },
    });
  }

  async getUser(id: number) {
    const user = await this.prisma.users.findUnique({
      where: { userId: id },
      select: {
        userId: true,
        email: true,
        fName: true,
        lName: true,
        createdAt: true,
        cardStudied: true,
        correct: true,
      },
    });
    return user;
  }

  async getTokens(
    userId: number,
    email: string,
    fName: string,
    lName: string,
    rememberMe: boolean = false,
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      email,
      fName,
      lName,
    };

    // Set longer expiration times if "remember me" is checked
    const accessTokenExpiry = rememberMe ? '24h' : '15m';
    const refreshTokenExpiry = rememberMe ? '30d' : '7d';

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('AT_SECRET') || 'at-secret',
        expiresIn: accessTokenExpiry,
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('RT_SECRET') || 'rt-secret',
        expiresIn: refreshTokenExpiry,
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
