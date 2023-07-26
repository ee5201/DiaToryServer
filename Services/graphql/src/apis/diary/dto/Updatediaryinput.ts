import { Field, InputType, PartialType, extend } from '@nestjs/graphql';
import { Diary } from '../entities/diary.entity';
import { CreateCategoryInput } from 'src/apis/diaryCategories/dto/createDiaryCategoryInput';
import { UserIdInput } from 'src/apis/user/dto/UserIdInput';

@InputType()
export class Updatediaryinput {
  @Field(() => String)
  title: string;
  @Field(() => String)
  contents: string;

  @Field(() => String, { nullable: true })
  createCategoryId: string;
}
