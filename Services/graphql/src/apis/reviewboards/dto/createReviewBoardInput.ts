import { Field, InputType, Int } from '@nestjs/graphql';
import { UserIdInput } from 'src/apis/user/dto/UserIdInput';
@InputType()
export class CreateReviewBoardInput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;
  @Field(() => Int, { nullable: true })
  likescount?: number;
  @Field(() => Int, { nullable: true })
  dislikescount?: number;
}
