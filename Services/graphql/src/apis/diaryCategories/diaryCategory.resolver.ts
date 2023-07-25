import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { DiarycategoryService } from './diaryCategory.service';
import { DiaryCategory } from './entities/diarycategory.entity';
import { CreateDiaryInput } from '../diary/dto/CreateDiaryInput';
import { CreateCategoryInput } from './dto/createDiaryCategoryInput';

@Resolver()
export class DiarycategoryResolver {
  constructor(private readonly diarycategoryservice: DiarycategoryService) {}

  @Mutation(() => DiaryCategory)
  createCategory(@Args('createCategory') createCategory: CreateCategoryInput) {
    return this.diarycategoryservice.createCategory({ createCategory });
  }
}
