import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { DiaryCategory } from './entities/diarycategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDiaryCategoryCreateCategory } from './interface/diaryCategory-service';

@Injectable()
export class DiarycategoryService {
  constructor(
    @InjectRepository(DiaryCategory)
    private readonly DiaryCategoryRepository: Repository<DiaryCategory>,
  ) {}
  createCategory({ createCategory }: IDiaryCategoryCreateCategory) {
    return this.DiaryCategoryRepository.save({
      ...createCategory,
    });
  }
}
