import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { SetModule } from './set/set.module';
import { PrismaModule } from './prisma/prisma.module';
import { FlashcardModule } from './flashcard/flashcard.module';
import { ConfigModule } from '@nestjs/config';
import { UserCardInfoModule } from './user-card-info/user-card-info.module';

@Module({
  imports: [
    AuthModule,
    SetModule,
    FlashcardModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    UserCardInfoModule,
  ],
})
export class AppModule {}
