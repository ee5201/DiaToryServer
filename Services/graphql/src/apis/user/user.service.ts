import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  IUserServiceCreateUser,
  IUserServicePhoneUser,
} from './interface/user-service';
import coolsms from 'coolsms-node-sdk';
import { CoolsmsService } from 'coolsms';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
  ) {}

  fetchAll(): Promise<User[]> {
    return this.UserRepository.find();
  }
  //이메일 검증
  findEmail({ email }): Promise<User> {
    return this.UserRepository.findOne({
      where: { email },
    });
  }
  //닉네임 검증
  findnickname({ nickname }): Promise<User> {
    return this.UserRepository.findOne({
      where: {
        nickname,
      },
    });
  }

  getHashedPwd({ password }): Promise<string> {
    return bcrypt.hash(password, 10);
  }
  //phone
  async createPhoneNum({ phone }): Promise<string> {
    if (phone.length === 10 || phone.length === 11) {
      const phoneresult = String(Math.floor(Math.random() * 10 ** 6)).padStart(
        6,
        '0',
      );
      return phoneresult;
    }
  }
  async verifyPhoneNum({ phone, verificationCode }): Promise<boolean> {
    const validCode = await this.createPhoneNum({ phone }); // 유효한 인증번호 생성
    return validCode === verificationCode; // 입력된 인증번호와 유효한 인증번호를 비교하여 일치 여부를 반환합니다.
  }

  async createUser({ createSign }: IUserServiceCreateUser) {
    const { nickname, email, password, phone } = createSign;
    // 이메일 닉네임 확인
    const user = await this.findEmail({ email });
    if (user) throw new ConflictException('이미 등록된 이메일 입니다. ');
    const usernickname = await this.findnickname({
      nickname,
    });
    if (usernickname)
      throw new ConflictException(
        '이미 등록된 닉네임이 있습니다 다른 닉네임을 사용해주세요',
      );

    // 이메일형식 검사
    const emailCheck = createSign.email;
    if (!emailCheck.includes('@') || !emailCheck.includes('.'))
      throw new ConflictException('이메일 형식이 잘못 되었습니다.');

    //해쉬 비밀번호
    const hashedPassword = await this.getHashedPwd({ password });

    return this.UserRepository.save({
      email,
      password: hashedPassword,
      nickname,
      phone,
    });
  }
}
