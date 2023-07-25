import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Diary } from '../entities/diary.entity';
import { UserIdInput } from 'src/apis/user/dto/UserIdInput';

@InputType()
export class FetchDairyInput {
  @Field(() => UserIdInput, { nullable: true })
  userId: UserIdInput;
}
