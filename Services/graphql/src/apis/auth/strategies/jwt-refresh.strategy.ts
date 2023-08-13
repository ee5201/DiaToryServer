import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtRefreshStratgy extends PassportStrategy(Strategy, 'refresh') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: (req) => {
        console.log(req);
        const cookie = req.headers.cookie;
        const refreshToken = cookie?.replace('refreshToken=', '');
        return refreshToken;
      },
      secretOrKey: 'refresh',
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload) {
    console.log(payload);
    const refreshToken = req.headers.cookie?.replace('refreshToken=', '');
    const redisRefreshToken = await this.cacheManager.get(
      `refreshToken:${refreshToken}`,
    );
    if (redisRefreshToken)
      throw new UnauthorizedException('로그아웃된 토큰 입니다.');

    return {
      id: payload.sub,
      email: payload.sub.email,
    };
  }
}
