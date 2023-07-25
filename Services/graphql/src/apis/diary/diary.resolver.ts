import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryService } from './diary.service';
import { CreateDiaryInput } from './dto/CreateDiaryInput';
import { Diary } from './entities/diary.entity';
import { FetchDairyInput } from './dto/FetchDairysInput';

@Resolver()
export class DiaryResolver {
  constructor(
    private readonly diaryService: DiaryService, //
  ) {}
  // 전체 일기 불러오기
  // 전체 일기 불러오기
  @Query(() => [Diary])
  fetchDairys(@Args('userId') userId: string): Promise<Diary[]> {
    return this.diaryService.fetchDairys(userId);
  }

  //일기 작성
  @Mutation(() => Diary)
  CreateDiary(
    @Args('createDiary') createDiary: CreateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.CreateDiary({ createDiary });
  }
}
