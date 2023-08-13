import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import * as bcrypt from 'bcrypt';

export class JwtGoogleStratgy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '138385555107-ll2oaansc3okvdv60eenpi2qegvtmvge.apps.googleusercontent.com',
      clientSecret: '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',
      callbackURL: 'http://localhost:3000/login/google',
      scope: ['email', 'profile'],
    });
  }
  async hashPassword(password: string): Promise<string> {
    const saltRounds = 10; // salt를 몇 번을 반복하여 생성할지 설정
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  }

  async validate(_: string, __: string, profile: Profile) {
    console.log(profile);
    return {
      name: profile.displayName,
      email: profile._json.email,
      nickname: profile._json.given_name,
    };
  }
}
