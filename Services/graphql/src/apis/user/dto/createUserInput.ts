import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CreateUserInput {
  @Field(() => String)
  nickname: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  password: string;

  @Field(() => String, { nullable: true })
  phone?: string;
}
