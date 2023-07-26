import { Field, InputType, PartialType } from '@nestjs/graphql';

@InputType()
export class CheckAuthNumberInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  authNumber: string;
}
