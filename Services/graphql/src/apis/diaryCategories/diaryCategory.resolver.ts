import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiarycategoryService } from './diaryCategory.service';
import { DiaryCategory } from './entities/diarycategory.entity';
import { CreateDiaryInput } from '../diary/dto/CreateDiaryInput';
import { CreateCategoryInput } from './dto/createDiaryCategoryInput';
import { UpdateCategoryInput } from './dto/updateCategoryInput';

@Resolver()
export class DiarycategoryResolver {
  constructor(private readonly diarycategoryservice: DiarycategoryService) {}
  // 카테고리 이름 조회
  @Query(() => DiaryCategory)
  fetchCategory(@Args('name') name: string): Promise<DiaryCategory> {
    return this.diarycategoryservice.fetchCategoryName({ name });
  }

  @Query(() => [DiaryCategory])
  fetchCategorys(): Promise<DiaryCategory[]> {
    return this.diarycategoryservice.fetchCategorys();
  }

  // 카테고리 등록
  @Mutation(() => DiaryCategory)
  createCategory(@Args('createCategory') createCategory: CreateCategoryInput) {
    return this.diarycategoryservice.createCategory({ createCategory });
  }

  // 카테고리 업데이트
  @Mutation(() => DiaryCategory)
  updateCategory(
    @Args('categoryId') categoryId: string,
    @Args('updateCategoryInput') updateCategoryInput: UpdateCategoryInput,
  ) {
    return this.diarycategoryservice.updateCategory({
      categoryId,
      updateCategoryInput,
    });
  }
}
