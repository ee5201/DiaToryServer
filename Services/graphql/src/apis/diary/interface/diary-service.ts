import { IContext } from 'src/commons/interface/context';
import { CreateDiaryInput } from '../dto/CreateDiaryInput';

export interface IDiaryCreateDiary {
  createDiary: CreateDiaryInput;
  context: IContext;
}

export interface IDiaryServiceFetchDairys {
  userId: string;
}

export interface IDiaryServiceFetchDiaryId {
  diaryId: string;
}
