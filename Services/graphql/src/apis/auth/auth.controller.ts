import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { IOAuthUser } from './interface/auth-service';

@Controller()
export class AuthController {
  constructor(
    private readonly authservice: AuthService, //
  ) {}
  @Get('/login/google')
  @UseGuards(GqlAuthGuard('google'))
  logingoogle(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authservice.socialLogin({ req, res });
  }
  @Get('/login/naver')
  @UseGuards(GqlAuthGuard('naver'))
  loginnaver(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authservice.socialLogin({ req, res });
  }
  @Get('/login/kakao')
  @UseGuards(GqlAuthGuard('kakao'))
  loginkakao(
    @Req() req: Request & IOAuthUser, //
    @Res() res: Response,
  ) {
    return this.authservice.socialLogin({ req, res });
  }
}
