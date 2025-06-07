import { ForbiddenException, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthDto } from "./dto";
import * as argon from 'argon2'
import { PrismaClientKnownRequestError } from "generated/prisma/runtime/library";

@Injectable()
export class AuthService {
    constructor(private prisma: PrismaService) {}

    async signup(dto: AuthDto) {
        // generate the password hash
        const hash = await argon.hash(dto.password);

        // save new user in the db
       try {
            const user = await this.prisma.users.create({
                data: {
                    email: dto.email,
                    f_name: dto.f_name,
                    l_name: dto.l_name,
                    password: hash
                },
                select: {
                    user_id: true,
                    email: true,
                    f_name: true,
                    l_name: true
                }
            })
            return user;
        } catch (error) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === 'P2002') {
                    throw new ForbiddenException('Credenmtials taken')
                }
            }
            throw error;
        }
        
        // return the saved user
        
    }

    async signin(dto: AuthDto) {
        const user = await this.prisma.users.findUnique({
            where: {
                email: dto.email
            }
        })

        if (!user) {
            throw new ForbiddenException('Credentials incorrect');
        }

        const pwMatches = await argon.verify(user.password, dto.password);

        if (!pwMatches) {
            throw new ForbiddenException('Credentials incorrect');
        }
        
        return user;
    }

}