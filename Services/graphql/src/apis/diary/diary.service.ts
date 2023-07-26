import { Injectable } from '@nestjs/common';
import { DeepPartial, Equal, Repository } from 'typeorm';
import { Diary } from './entities/diary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IDiaryCreateDiary,
  IDiaryServiceFetchDairys,
  IDiaryServiceFetchDiaryId,
} from './interface/diary-service';

import { DiarycategoryService } from '../diaryCategories/diaryCategory.service';
import { IDiaryServiceUpdateDiary } from '../diaryCategories/interface/diaryCategory-service';
import { UserService } from '../user/user.service';

@Injectable()
export class DiaryService {
  constructor(
    private readonly userService: UserService,
    private readonly diaryCategoryService: DiarycategoryService,
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}
  // 유저 일기 전체 불러오기
  async fetchDairys({ userId }: IDiaryServiceFetchDairys): Promise<Diary[]> {
    return await this.diaryRepository.find({
      where: { user: Equal(userId) },
      relations: ['diaryCategory'],
    });
  }
  //일기ID찾기
  fetchDiaryId({ diaryId }: IDiaryServiceFetchDiaryId): Promise<Diary> {
    return this.diaryRepository.findOne({
      where: {
        id: diaryId,
      },
    });
  }

  // 일기 작성
  async CreateDiary({
    createDiary,
    context,
  }: IDiaryCreateDiary): Promise<Diary> {
    const { Categoryid, ...Diary } = createDiary;
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });

    const result = this.diaryRepository.save({
      ...Diary,
      user,
      diaryCategory: {
        id: Categoryid,
      },
    });
    return result;
  }

  async updateDiary({
    diaryId,
    updatediaryinput,
    context,
  }: IDiaryServiceUpdateDiary): Promise<Diary> {
    const user = await this.userService.findOneByUser({
      userId: context.req.user.id,
    });

    const id = await this.fetchDiaryId({ diaryId });
    const result = this.diaryRepository.save({
      ...id,
      ...updatediaryinput,
      user,
    } as DeepPartial<Diary>);
    return result;
  }
}
