import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SetModule } from './set/set.module';
import { CardModule } from './card/card.module';
import { PrismaModule } from './prisma/prisma.module';


@Module({
  imports: [AuthModule, UserModule, SetModule, CardModule, PrismaModule],
})
export class AppModule {}
