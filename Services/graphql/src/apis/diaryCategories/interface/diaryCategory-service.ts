import { Updatediaryinput } from 'src/apis/diary/dto/Updatediaryinput';
import { CreateCategoryInput } from '../dto/createDiaryCategoryInput';
import { IContext } from 'src/commons/interface/context';

export interface IDiaryCategoryCreateCategory {
  createCategory: CreateCategoryInput;
}

export interface IDiaryServiceUpdateDiary {
  diaryId: string;
  updatediaryinput: Updatediaryinput;
  context: IContext;
}
