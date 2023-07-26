import { Module } from '@nestjs/common';
import { DiarycategoryResolver } from './diaryCategory.resolver';
import { DiarycategoryService } from './diaryCategory.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DiaryCategory } from './entities/diarycategory.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DiaryCategory])],
  providers: [
    DiarycategoryResolver, //
    DiarycategoryService,
  ],
  exports: [DiarycategoryService],
})
export class DiarycategoryModule {}
