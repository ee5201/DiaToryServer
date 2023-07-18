import { CreatePhoneInput } from '../dto/createPhoneInput';
import { CreateUserInput } from '../dto/createUserInput';

export interface IUserServiceCreateUser {
  createSign: CreateUserInput;
}

export interface IUserServicePhoneUser {
  phone: CreatePhoneInput;
}
