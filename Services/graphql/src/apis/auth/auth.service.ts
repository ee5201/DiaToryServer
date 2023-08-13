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
import { Token } from './dto/Objectauth-service';

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
      { secret: 'access', expiresIn: '1h' }, //
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
  async restoreAccessToken({
    user,
  }: IAuthServiceRestoreAccessToken): Promise<Token> {
    const accessToken = this.getAccessToken({ user });
    const token: Token = { accessToken };
    return Promise.resolve(token);
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
    res.redirect('http://localhost:3001/AfterLoginHomePage');
  }

  //로그아웃
  async Logout({ req }: IAuthServiceLogout): Promise<string> {
    const refreshToken = req.headers.cookie?.replace('refreshToken=', '');
    const accessToken = req.headers.authorization?.replace('Bearer ', '');
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
    await Promise.all([
      this.cacheManager.set(`refreshToken=${refreshToken}`, 'refresh', {
        ttl: 604800,
      }),
      this.cacheManager.set(`accessToken=${accessToken}`, 'access', {
        ttl: 3600,
      }),
    ]);
    return '로그아웃에 성공하였습니다.';
  }

  // 로그인 진행 로직
  async login({ email, password, context }: IAuthSerivceLogin): Promise<Token> {
    // 1. 이메일이 일치하는지 확인
    const user = await this.userService.findOneByEmail({ email });
    if (!user) throw new UnprocessableEntityException('이메일이 없습니다.');

    //2. 해당 비밀번호와 db 비밀번호가 같는지 확인
    const isAuthentication = await bcrypt.compare(password, user.password);
    if (!isAuthentication)
      throw new UnprocessableEntityException('암호가 틀렸습니다.');

    //리프레시 토큰
    this.SetReFreshToken({ user, res: context.res });
    const accessToken = this.getAccessToken({ user });
    const token: Token = { accessToken }; // Token 객체 생성
    return token;
  }
}
