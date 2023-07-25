import { InputType, PartialType } from '@nestjs/graphql';
import { DiaryCategory } from '../entities/diarycategory.entity';

@InputType()
export class CreateCategoryInput extends PartialType(
  DiaryCategory,
  InputType,
) {}
