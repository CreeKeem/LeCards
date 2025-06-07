import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SignInDto, SignUpDto } from './dto';
import * as argon from 'argon2';
import { PrismaClientKnownRequestError } from 'generated/prisma/runtime/library';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService) {}

  async signup(dto: SignUpDto) {
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
      // return the saved user
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
    return user.email;
  }
}
