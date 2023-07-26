import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BoardComment } from './entities/boardComment.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ReviewboardService } from '../reviewboards/reviewboard.service';

@Injectable()
export class BoardCommentService {
  constructor(
    private readonly reviewBoard: ReviewboardService,
    private readonly userService: UserService,
    @InjectRepository(BoardComment)
    private readonly BoardCommentRepository: Repository<BoardComment>,
  ) {}

  async createComment({ boardId, createCommentInput, context }) {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    return this.BoardCommentRepository.save({
      ...createCommentInput,
      user,
      reviewboard: {
        id: boardId,
      },
    });
  }
}
