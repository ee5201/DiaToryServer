import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { DiaryService } from './diary.service';
import { CreateDiaryInput } from './dto/CreateDiaryInput';
import { Diary } from './entities/diary.entity';
import { FetchDairyInput } from './dto/FetchDairysInput';
import { Updatediaryinput } from './dto/Updatediaryinput';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interface/context';

@Resolver()
export class DiaryResolver {
  constructor(
    private readonly diaryService: DiaryService, //
  ) {}
  // 유저 일기 불러오기
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => [Diary])
  fetchDairys(@Context() context: IContext): Promise<Diary[]> {
    return this.diaryService.fetchDairys({ userId: context.req.user.id });
  }

  //일기 작성
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Diary)
  CreateDiary(
    @Context() context: IContext,
    @Args('createDiary') createDiary: CreateDiaryInput,
  ): Promise<Diary> {
    return this.diaryService.CreateDiary({ createDiary, context });
  }

  // 일기 수정
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => Diary)
  UpdateDiary(
    @Args('diaryId') diaryId: string,
    @Context() context: IContext,
    @Args('updatediaryinput') updatediaryinput: Updatediaryinput,
  ) {
    return this.diaryService.updateDiary({
      diaryId,
      updatediaryinput,
      context,
    });
  }
}
