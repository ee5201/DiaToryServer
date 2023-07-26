import { Module } from '@nestjs/common';
import { DiaryResolver } from './diary.resolver';
import { DiaryService } from './diary.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Diary } from './entities/diary.entity';
import { UserMoudle } from '../user/user.module';
import { DiaryCategory } from '../diaryCategories/entities/diarycategory.entity';
import { DiarycategoryModule } from '../diaryCategories/diaryCategory.module';
import { DiarycategoryService } from '../diaryCategories/diaryCategory.service';

@Module({
  imports: [
    UserMoudle,
    DiarycategoryModule,

    TypeOrmModule.forFeature([
      Diary, //
    ]),
  ],
  providers: [
    DiaryResolver, //
    DiaryService,
  ],
})
export class DiaryModule {}
