import { Module } from '@nestjs/common';
import { AuthResolver } from './auth.resolver';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { UserMoudle } from '../user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { JwtAccessStratgy } from './strategies/jwt-access.strategy';
import { JwtRefreshStratgy } from './strategies/jwt-refresh.strategy';
import { AuthController } from './auth.controller';
import { JwtGoogleStratgy } from './strategies/jwt-social-google.strategy';
import { JwtNaverStrategy } from './strategies/jwt-social-naver.strategy';
import { JwtKakaoStrategy } from './strategies/jwt-social-kako.strategy';

@Module({
  imports: [
    JwtModule.register({}), //
    UserMoudle,
  ],
  providers: [
    JwtAccessStratgy, //
    JwtRefreshStratgy,
    JwtGoogleStratgy,
    JwtNaverStrategy,
    JwtKakaoStrategy,
    AuthResolver,
    AuthService,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
