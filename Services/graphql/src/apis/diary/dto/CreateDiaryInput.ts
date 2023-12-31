import { Field, InputType, PartialType } from '@nestjs/graphql';
import { Diary } from '../entities/diary.entity';
import { UserIdInput } from 'src/apis/user/dto/UserIdInput';
import { CreateCategoryInput } from 'src/apis/diaryCategories/dto/createDiaryCategoryInput';

@InputType()
export class CreateDiaryInput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;
  @Field(() => String)
  Categoryid: string;
}
