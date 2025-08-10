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

  async signup(dto: SignUpDto): Promise<Tokens> {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save new user in the db
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
      );

      await this.updateRtHash(user.userId, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw error;
    }
  }

  async signin(dto: SignInDto): Promise<Tokens> {
    // find user's email
    const user = await this.prisma.users.findUnique({
      where: {
        email: dto.email,
      },
    });

    // throw exception if email is incorrect
    if (!user) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // checks if password is correct
    const pwMatches = await argon.verify(user.password, dto.password);

    // throws exception if password is incorrect
    if (!pwMatches) {
      throw new ForbiddenException('Credentials incorrect');
    }

    // generate and return tokens
    const tokens = await this.getTokens(
      user.userId,
      user.email,
      user.fName,
      user.lName,
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

  async refreshTokens(userId: number, rt: string): Promise<Tokens> {
    const user = await this.prisma.users.findUnique({
      where: {
        userId: userId,
      },
    });

    // Check if user exists and has refresh token
    if (!user || !user.hashedRt) {
      throw new ForbiddenException('Access Denied');
    }

    // Verify refresh token
    const rtMatches = await argon.verify(user.hashedRt, rt);
    if (!rtMatches) {
      throw new ForbiddenException('Access Denied');
    }

    // Generate new tokens
    const tokens = await this.getTokens(
      user.userId,
      user.email,
      user.fName,
      user.lName,
    );

    // Update refresh token hash
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
  ): Promise<Tokens> {
    const payload = {
      sub: userId,
      email,
      fName,
      lName,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('AT_SECRET') || 'at-secret',
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(payload, {
        secret: this.configService.get<string>('RT_SECRET') || 'rt-secret',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
