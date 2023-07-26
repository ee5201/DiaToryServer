import { InputType, PartialType, extend } from '@nestjs/graphql';
import { DiaryCategory } from '../entities/diarycategory.entity';
import { CreateCategoryInput } from './createDiaryCategoryInput';

@InputType()
export class UpdateCategoryInput extends PartialType(
  CreateCategoryInput,
  InputType,
) {}
