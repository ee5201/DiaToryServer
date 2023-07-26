import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { DiaryCategory } from './entities/diarycategory.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { IDiaryCategoryCreateCategory } from './interface/diaryCategory-service';

@Injectable()
export class DiarycategoryService {
  constructor(
    @InjectRepository(DiaryCategory)
    private readonly DiaryCategoryRepository: Repository<DiaryCategory>,
  ) {}

  fetchCategorys() {
    return this.DiaryCategoryRepository.find();
  }

  // 카테고리 이름 조회
  async fetchCategoryName({ name }): Promise<DiaryCategory> {
    return await this.DiaryCategoryRepository.findOne({
      where: {
        name: name,
      },
    });
  }
  // 카테고리 id 조회
  async fetchCategoryId({ categoryId }) {
    return await this.DiaryCategoryRepository.findOne({
      where: {
        id: categoryId,
      },
    });
  }

  // 카테고리 추가
  createCategory({ createCategory }: IDiaryCategoryCreateCategory) {
    return this.DiaryCategoryRepository.save({
      ...createCategory,
    });
  }

  // 카테고리 수정
  async updateCategory({ categoryId, updateCategoryInput }) {
    const id = await this.fetchCategoryId({ categoryId });
    const result = this.DiaryCategoryRepository.save({
      ...id,
      ...updateCategoryInput,
    } as DeepPartial<DiaryCategory>);

    return result;
  }
}
