import { InputType, PickType } from '@nestjs/graphql';
import { BoardComment } from '../entities/boardComment.entity';

@InputType()
export class CreateCommentInput extends PickType(
  BoardComment,
  ['contents', 'NickName'],
  InputType,
) {}
