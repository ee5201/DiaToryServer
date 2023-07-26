import { Module } from '@nestjs/common';
import { BoardCommentResolver } from './BoardComment.resolver';
import { BoardCommentService } from './BoardComment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardComment } from './entities/boardComment.entity';
import { ReviewboardModule } from '../reviewboards/reviewboard.module';
import { UserService } from '../user/user.service';

@Module({
  imports: [
    ReviewboardModule, //
    UserService,
    TypeOrmModule.forFeature([BoardComment]),
  ],
  providers: [
    BoardCommentResolver, //
    BoardCommentService,
  ],
})
export class BoardCommentModule {}
