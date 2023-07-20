import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import * as bcrypt from 'bcrypt';

export class JwtGoogleStratgy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      clientID:
        '496368415680-5okf2looe1acraa54eqb9pn98fnb4327.apps.googleusercontent.com',
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
    const hashedPassword = await this.hashPassword('0');
    return {
      name: profile.displayName,
      email: profile._json.email,
      nickname: profile._json.given_name,
    };
  }
}
