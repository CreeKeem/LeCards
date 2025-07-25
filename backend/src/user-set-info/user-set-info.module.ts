import { Module } from '@nestjs/common';
import { UserSetInfoService } from './user-set-info.service';
import { UserSetInfoController } from './user-set-info.controller';

@Module({
  providers: [UserSetInfoService],
  controllers: [UserSetInfoController]
})
export class UserSetInfoModule {}
