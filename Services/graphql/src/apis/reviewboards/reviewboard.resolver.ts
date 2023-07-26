import { Args, Context, Int, Mutation, Resolver } from '@nestjs/graphql';
import { ReviewboardService } from './reviewboard.service';

import { CreateReviewBoardInput } from './dto/createReviewBoardInput';
import { Reviewboard } from './entities/reviewboard.entity';
import { LikeBoardInput } from './dto/likeBoardInput'; // Import the new LikeBoardInput
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interface/context';

@Resolver()
export class ReviewboardResolver {
  constructor(private readonly reviewboardservice: ReviewboardService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Reviewboard)
  async likeBoard(
    @Args('boardId') boardId: string,
    @Context() context: IContext,
  ): Promise<Reviewboard> {
    return this.reviewboardservice.likeBoard({ boardId, context });
  }
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Reviewboard)
  async dislikeBoard(
    @Args('boardId') boardId: string, //
    @Context() context: IContext,
  ) {
    return this.reviewboardservice.dislikeBoard({ boardId, context });
  }

  //페이지 리뷰 작성게시물
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Reviewboard)
  createReviewBoard(
    @Args('createReviewBoardInput')
    createReviewBoardInput: CreateReviewBoardInput,
    @Context() context: IContext,
  ) {
    return this.reviewboardservice.createReviewBoard({
      createReviewBoardInput,
      context,
    });
  }
}
