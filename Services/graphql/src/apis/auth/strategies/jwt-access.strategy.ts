import { CACHE_MANAGER, Inject, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Cache } from 'cache-manager';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

export class JwtAccessStratgy extends PassportStrategy(Strategy, 'access') {
  constructor(
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'access',
      passReqToCallback: true,
    });
  }
  async validate(req: Request, payload) {
    console.log(payload);
    const accessToken = req.headers.authorization.replace('Bearer', '');
    const redisAccessToken = await this.cacheManager.get(
      `accessToken: ${accessToken}`,
    );
    if (redisAccessToken)
      throw new UnauthorizedException('로그아웃된 토큰입니다.');
    return {
      id: payload.sub,
      email: payload.sub.email,
    };
  }
}
