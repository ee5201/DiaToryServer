import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStratgy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const refreshToken = req.headers.cookie.split('=')[1];
        return refreshToken;
      },
      secretOrKey: 'refresh',
      passReqToCallback: true,
    });
  }
  async validate(req, payload) {
    console.log(payload);
    const refreshToken = req.headers.cookie.split('=')[1];
    const redisRefreshToken = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );
    if (redisRefreshToken)
      throw new UnauthorizedException('로그아웃된 토큰 입니다.');

    return {
      id: payload.sub,
      exp: payload.exp,
    };
  }
}
