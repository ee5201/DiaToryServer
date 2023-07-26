import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class LikeBoardInput {
  @Field(() => Int, { nullable: true })
  likescount?: number;
}
