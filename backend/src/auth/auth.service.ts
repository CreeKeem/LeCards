import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwwtService: JwtService,
  ) {}

  async signup(dto: SignUpDto) {
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
      // const tokens = await this.getTokens(
      //   user.userid,
      //   user.email,
      //   user.fname,
      //   user.lname,
      // );
      // return the saved user
      // await this.updateRtHash(user.userid, tokens.refreshtoken);
      return user;
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
    // const tokens = await this.getTokens(
    //   user.userid,
    //   user.email,
    //   user.fname,
    //   user.lname,
    // );
    // return the saved user
    // await this.updateRtHash(user.userid, tokens.refreshtoken);
    return {
      userid: user.userId,
      email: user.email,
      fname: user.fName,
      lname: user.lName,
    };
  }

  async logout(userId: number) {
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
  }

  async refreshTokens(userId: number, rt: string) {}

  async updateRtHash(userId: number, rt: string) {
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

  // async getTokens(
  //   userid: number,
  //   email: string,
  //   fname: string,
  //   lname: string,
  // ): Promise<Tokens> {
  //   const [at, rt] = await Promise.all([
  //     this.jwwtService.signAsync(
  //       {
  //         sub: userid,
  //         email,
  //         fname,
  //         lname,
  //       },
  //       {
  //         secret: 'at-secret',
  //         expiresIn: 60 * 15,
  //       },
  //     ),
  //     this.jwwtService.signAsync(
  //       {
  //         sub: userid,
  //         email,
  //         fname,
  //         lname,
  //       },
  //       {
  //         secret: 'rt-secret',
  //         expiresIn: 60 * 60 * 24 * 7,
  //       },
  //     ),
  //   ]);

  //   return {
  //     accesstoken: at,
  //     refreshtoken: rt,
  //   };
  // }
}
