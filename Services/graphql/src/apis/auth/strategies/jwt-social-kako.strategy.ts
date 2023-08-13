import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-kakao';

export class JwtKakaoStrategy extends PassportStrategy(Strategy, 'kakao') {
  constructor() {
    super({
      clientID: 'cb3b27e55449379fc15d05f81ab54d1b',
      clientSecret: 'OIh1ktkiTKEusm0o2MZfIxqiGa3rMSLO',
      callbackURL: 'http://localhost:3000/login/kakao',
      scope: ['account_email', 'profile_nickname'],
    });
  }

  validate(_: string, __: string, profile: Profile) {
    return {
      id: profile.id,
    };
  }
}
