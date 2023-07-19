import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CheckAuthNumberInput {
  @Field(() => String)
  email: string;

  @Field(() => String)
  authNumber: string;
}
