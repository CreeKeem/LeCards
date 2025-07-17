import { Module } from '@nestjs/common';
import { UserCardInfoService } from './user-card-info.service';
import { UserCardInfoController } from './user-card-info.controller';

@Module({
  providers: [UserCardInfoService],
  controllers: [UserCardInfoController]
})
export class UserCardInfoModule {}
