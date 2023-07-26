import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Reviewboard } from './entities/reviewboard.entity';
import { LikeBoardInput } from './dto/likeBoardInput'; // Import the new LikeBoardInput
import { UserService } from '../user/user.service';

@Injectable()
export class ReviewboardService {
  constructor(
    @InjectRepository(Reviewboard)
    private readonly reviewboardRepository: Repository<Reviewboard>,
    private readonly userService: UserService,
  ) {}

  async fetchBoardById({ boardId }): Promise<Reviewboard> {
    return this.reviewboardRepository.findOne({
      where: {
        id: boardId,
      },
    });
  }
  // 좋아함 카운트
  async likeBoard({ boardId, context }): Promise<Reviewboard> {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    const Id = await this.fetchBoardById({ boardId });
    Id.likescount++;

    return this.reviewboardRepository.save({
      user,
      ...Id,
      likescount: Id.likescount++,
    });
  }
  // 싫어함 카운트
  async dislikeBoard({ boardId, context }): Promise<Reviewboard> {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    const Id = await this.fetchBoardById({ boardId });
    Id.dislikescount++;

    return this.reviewboardRepository.save({
      user,
      ...Id,
      dislikescount: Id.dislikescount++,
    });
  }

  //리뷰게시판 작성
  async createReviewBoard({ createReviewBoardInput, context }) {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });
    const result = await this.reviewboardRepository.save({
      ...createReviewBoardInput,
      user,
    });
    return result;
  }
}
