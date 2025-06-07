import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { SetModule } from './set/set.module';
import { PrismaModule } from './prisma/prisma.module';
import { FlashcardModule } from './flashcard/flashcard.module';


@Module({
  imports: [AuthModule, UserModule, SetModule, FlashcardModule, PrismaModule],
})
export class AppModule {}
