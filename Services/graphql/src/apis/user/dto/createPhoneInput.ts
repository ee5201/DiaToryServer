import { Field, InputType, PartialType } from '@nestjs/graphql';
import { User } from '../entities/user.entity';

@InputType()
export class CreatePhoneInput {
  @Field(() => String)
  phone: string;
}
