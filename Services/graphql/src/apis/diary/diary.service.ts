import { Injectable } from '@nestjs/common';
import { Equal, Repository } from 'typeorm';
import { Diary } from './entities/diary.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDiaryCreateDiary } from './interface/diary-service';
import { CreateDiaryInput } from './dto/CreateDiaryInput';

@Injectable()
export class DiaryService {
  constructor(
    @InjectRepository(Diary)
    private readonly diaryRepository: Repository<Diary>,
  ) {}
  // 전체 일기 불러오기
  async fetchDairys(userId: string): Promise<Diary[]> {
    return await this.diaryRepository.find({
      where: { user: Equal(userId) },
    });
  }

  // 일기 작성
  CreateDiary({ createDiary }: IDiaryCreateDiary): Promise<Diary> {
    const { userId, ...Diary } = createDiary;
    const result = this.diaryRepository.save({
      ...Diary,
      user: {
        ...userId,
      },
    });
    return result;
  }
}
