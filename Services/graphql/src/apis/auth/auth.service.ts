import {
  CACHE_MANAGER,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import {
  IAuthSerivceLogin,
  IAuthServiceGetAccessToken,
  IAuthServiceLogout,
  IAuthServiceRestoreAccessToken,
  IAuthServiceSetRefreshToken,
  IAuthServiceSocialLogin,
} from './interface/auth-service';
import { UserService } from '../user/user.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Cache } from 'cache-manager';

@Injectable()
export class AuthService {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly jwtService: JwtService,
    private readonly userService: UserService, //
  ) {}

  //JWT토큰
  getAccessToken({ user }: IAuthServiceGetAccessToken): string {
    return this.jwtService.sign(
      { sub: user.id },
      { secret: '나의비밀번호', expiresIn: '1h' }, //
    );
  }

  //Refresh토큰
  SetReFreshToken({ user, res }: IAuthServiceSetRefreshToken): void {
    const refreshToken = this.jwtService.sign(
      { sub: user.id },
      { secret: 'refresh', expiresIn: '2w' },
    );

    res.setHeader('set-Cookie', `refreshToken=${refreshToken}; path=/;`);
    res.setHeader('Access-Control-Allow-Credentials', 'true');

    //배포시
    // res.setHeader(
    //   'set-Cookie',
    //   `refreshToken=${refreshToken}; path=/; domain=.kyungback.shop; SameSite=None; Secure; httpOnly`,
    // );
    // res.setHeader('Access-Control-Allow-origin', 'https://fronttsite');
  }

  //restore
  restoreAccessToken({ user }: IAuthServiceRestoreAccessToken) {
    return this.getAccessToken({ user });
  }

  //소셜 로그인
  async socialLogin({ req, res }: IAuthServiceSocialLogin) {
    let user = await this.userService.findOneByEmail({
      email: req.user.email,
    });
    if (!user)
      await this.userService.createUserInput({
        createUserInput: req.user,
      });
    this.SetReFreshToken({ user, res });
    res.redirect('http://localhost:3001/test');
  }

  //로그아웃
  async Logout({ req }: IAuthServiceLogout): Promise<string> {
    const refreshToken = req.cookies.split('=')[1];
    const accessToken = req.headers.authorization.split('')[1];
    try {
      this.jwtService.verify(refreshToken, {
        secret: 'refresh',
      });
      this.jwtService.verify(accessToken, {
        secret: 'access',
      });
    } catch (error) {
      throw new UnprocessableEntityException('');
    }
    return '로그아웃';
  }

  // 로그인 진행 로직
  async login({
    email,
    password,
    context,
  }: IAuthSerivceLogin): Promise<string> {
    // 1. 이메일이 일치하는지 확인
    const user = await this.userService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    //2. 해당 비밀번호와 db 비밀번호가 같는지 확인
    const isAuthentication = await bcrypt.compare(password, user.password);
    if (!isAuthentication)
      throw new UnprocessableEntityException('암호가 틀렸습니다.');

    //리프레시 토큰
    this.SetReFreshToken({ user, res: context.res });
    return this.getAccessToken({ user });
  }
}
