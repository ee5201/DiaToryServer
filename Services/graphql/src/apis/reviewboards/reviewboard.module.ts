import { Module } from '@nestjs/common';
import { ReviewboardResolver } from './reviewboard.resolver';
import { ReviewboardService } from './reviewboard.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Reviewboard } from './entities/reviewboard.entity';
import { UserMoudle } from '../user/user.module';

@Module({
  imports: [
    UserMoudle,

    TypeOrmModule.forFeature([
      Reviewboard, //
    ]),
  ],
  providers: [ReviewboardResolver, ReviewboardService],
  exports: [ReviewboardService],
})
export class ReviewboardModule {}
