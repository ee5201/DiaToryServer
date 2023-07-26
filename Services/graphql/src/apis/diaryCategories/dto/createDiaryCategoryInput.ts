import { InputType, PartialType, PickType } from '@nestjs/graphql';
import { DiaryCategory } from '../entities/diarycategory.entity';

@InputType()
export class CreateCategoryInput extends PickType(
  DiaryCategory,
  ['name'],
  InputType,
) {}
