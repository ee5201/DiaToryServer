import { Request, Response } from 'express';
import { User } from 'src/apis/user/entities/user.entity';
import { IAuthUser, IContext } from 'src/commons/interface/context';

export interface IAuthSerivceLogin {
  email: string;
  password: string;
  context: IContext;
}

export interface IAuthServiceGetAccessToken {
  user: User | IAuthUser['user'];
}

export interface IAuthServiceSetRefreshToken {
  user?: User;
  res: Response;
}

export interface IAuthServiceRestoreAccessToken {
  user?: IAuthUser['user'];
}

export interface IAuthServiceLogout {
  req: Request;
}
export interface IOAuthUser {
  user: {
    email: string;
    password: string;
    nickname: string;
  };
}

export interface IAuthServiceSocialLogin {
  req: Request & IOAuthUser;
  res: Response;
}
