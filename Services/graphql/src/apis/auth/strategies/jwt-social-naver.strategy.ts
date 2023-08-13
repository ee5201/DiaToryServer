import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-naver-v2';

export class JwtNaverStrategy extends PassportStrategy(Strategy, 'naver') {
  constructor() {
    super({
      clientID: '14HlWrPNP4FL6jQodSIR',
      clientSecret: 'phneIv1dlN',
      callbackURL: 'http://localhost:3000/login/naver',
      scope: ['email', 'name'],
    });
  }

  async validate(_: string, __: string, profile: Profile) {
    console.log(profile);
    return {
      name: profile.name,
      email: profile.email,
    };
  }
}
