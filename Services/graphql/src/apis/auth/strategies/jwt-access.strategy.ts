import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStratgy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: '나의비밀번호',
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    console.log(payload);
    const accessToken = req.headers.authorization.split(' ')[1];
    const redisAccessToken = await this.cacheManager.get(
      `accessToken: ${accessToken}`,
    );
    if (redisAccessToken)
      throw new UnauthorizedException('로그아웃된 토큰입니다.');
    return {
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
