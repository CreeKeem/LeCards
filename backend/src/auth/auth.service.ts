import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwwtService: JwtService,
  ) {}

  async getTokens(
    user_id: number,
    email: string,
    f_name: string,
    l_name: string,
  ): Promise<Tokens> {
    const [at, rt] = await Promise.all([
      this.jwwtService.signAsync(
        {
          sub: user_id,
          email,
          f_name,
          l_name,
        },
        {
          secret: 'at-secret',
          expiresIn: 60 * 15,
        },
      ),
      this.jwwtService.signAsync(
        {
          sub: user_id,
          email,
          f_name,
          l_name,
        },
        {
          secret: 'rt-secret',
          expiresIn: 60 * 60 * 24 * 7,
        },
      ),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }

  async updateRtHash(userId: number, rt: string) {
    const hash = await argon.hash(rt);
    await this.prisma.users.update({
      where: {
        user_id: userId
      },
      data: {
        hashedRt: hash
      }
    })
  };

  async signup(dto: SignUpDto): Promise<Tokens> {
    // generate the password hash
    const hash = await argon.hash(dto.password);

    // save new user in the db
    try {
      const user = await this.prisma.users.create({
        data: {
          email: dto.email,
          f_name: dto.f_name,
          l_name: dto.l_name,
          password: hash,
        },
        select: {
          user_id: true,
          email: true,
          f_name: true,
          l_name: true,
        },
      });
      const tokens = await this.getTokens(
        user.user_id,
        user.email,
        user.f_name,
        user.l_name,
      );
      // return the saved user
      await this.updateRtHash(user.user_id, tokens.refresh_token)
      return tokens;
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new ForbiddenException('Credenmtials taken');
        }
      }
      throw error;
    }
  }

  async signin(dto: SignInDto) {
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

    // return user email
    return user.email;
  }

  async logout() {}

  async refreshTokens() {}
}
