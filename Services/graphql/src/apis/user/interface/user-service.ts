import { CreateUserInput } from '../dto/createUserInput';

export interface IUserServiceCreateUser {
  createSign: CreateUserInput;
}

// 닉네임확인 타입
export interface IUsersFindOneNickName {
  nickname: string;
}

//이메일 확인 타입
export interface IUsersFindOneEmail {
  email: string;
}

export interface IUsersCheckEmail {
  email: string;
}

export interface IUsersSendToUser {
  email: string;
}
