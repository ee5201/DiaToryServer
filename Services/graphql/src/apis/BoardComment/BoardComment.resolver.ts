import { Args, Context, Mutation, Resolver } from '@nestjs/graphql';
import { BoardCommentService } from './BoardComment.service';
import { BoardComment } from './entities/boardComment.entity';
import { CreateCommentInput } from './dto/CreateCommentInput';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interface/context';

@Resolver()
export class BoardCommentResolver {
  constructor(private readonly boardcommentService: BoardCommentService) {}

  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => BoardComment)
  createComment(
    @Args('BoardId') boardId: string,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
    @Context() context: IContext,
  ) {
    return this.boardcommentService.createComment({
      boardId,
      createCommentInput,
      context,
    });
  }
}
