import {
  CACHE_MANAGER,
  ConflictException,
  Inject,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import {
  IUserServiceCreateUser,
  IUsersCheckEmail,
  IUsersFindOneEmail,
  IUsersFindOneNickName,
  IUsersSendToUser,
} from './interface/user-service';
import { MailerService } from '@nest-modules/mailer';
import { Cache } from 'cache-manager';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly UserRepository: Repository<User>,
    @Inject(CACHE_MANAGER)
    private readonly cacheManager: Cache,
    private readonly mailerService: MailerService,
  ) {}
  //====================유저정보 불러오기=====================
  fetchAll(): Promise<User[]> {
    return this.UserRepository.find();
  }

  //로그인 회원 조회
  async findOneByUser({ userId }) {
    const user = await this.UserRepository.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) throw new ConflictException('등록되지 않은 회원입니다.');
    return {
      ...user,
    };
  }

  //===================유저 이메일 확인========================
  async findOneByEmail({ email }) {
    return this.UserRepository.findOne({ where: { email } });
  }

  //======================이메일DB 유무===========================
  CheckvaildEmail({ email }: IUsersFindOneEmail): Promise<User> {
    const isVailEmail = this.UserRepository.findOne({
      where: { email },
    });
    return isVailEmail;
  }
  //====================이메일 전송하기===========================
  async sendEmail({ email }: IUsersCheckEmail): Promise<string> {
    if (!email || !email.includes('@') || !email.includes('.')) {
      throw new ConflictException('제대로된 이메일을 입력해주세요');
    }
    await this.CheckvaildEmail({ email });

    await this.sendToUser({ email });
    return email;
  }

  //===================이메일 인증번호 및 템플릿 전송=====================
  async sendToUser({ email }: IUsersSendToUser): Promise<string> {
    // const user = await this.findOneByEmail({ email });

    const authNumber = String(Math.floor(Math.random() * 10 ** 6)).padStart(
      6,
      '0',
    );
    await this.cacheManager.set(email, authNumber, {
      ttl: 180,
    });

    const diatoryTemplate = `
    <html>
        <body>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                    <h1>DiaTory 전송된 인증번호입니다.</h1>     
                    <div style="color: black;">인증번호는 ${authNumber} 입니다..</div>
                </div>
            </div>
        </body>
    </html>
  `;
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'Diatory 인증 번호 입니다.',
      html: diatoryTemplate,
    });
    return '전송완료';
  }
  //===================인증번호 확인 검증============================
  async CheckAuthNumber({ checkAuthNumberInput }) {
    const { email, authNumber } = checkAuthNumberInput;
    const pass = await this.cacheManager.get(email);

    if (pass !== authNumber) {
      throw new UnprocessableEntityException('토큰이 잘못 되었습니다.');
    }
    return true;
  }

  //===================닉네임 검증============================
  findnickname({ nickname }: IUsersFindOneNickName): Promise<User> {
    const isVailNickName = this.UserRepository.findOne({
      where: {
        nickname,
      },
    });
    if (!nickname) {
      throw new ConflictException('닉네임을 제대로 입력해주세요');
    }
    return isVailNickName;
  }

  //===============비밀번호 해쉬============================
  getHashedPwd({ password }): Promise<string> {
    return bcrypt.hash(password, 10);
  }

  //======================회원가입 템플릿===========================
  async WelcomeTemplate({ email, nickname }) {
    const diatoryTemplate = `
    <html>
        <body>
            <div style="display: flex; flex-direction: column; align-items: center;">
                <div style="width: 500px;">
                    <h1>🌟🌟DiaTory 가입을 환영합니다🌟🌟</h1>     
                    <div style="color: black;">${nickname}님의 가입을 환영합니다.</div>
                </div>
            </div>
        </body>
    </html>
  `;
    this.mailerService.sendMail({
      to: email,
      from: process.env.EMAIL_USER,
      subject: 'DiaTory 인증 번호입니다', //이메일 제목
      html: diatoryTemplate,
    });
  }

  //==============================회원가입============================
  async createUserInput({ createUserInput }: IUserServiceCreateUser) {
    const { nickname, email, password } = createUserInput;

    if (!email.includes('@') || !email.includes('.')) {
      throw new ConflictException('이메일 형식이 다릅니다. 다시 확인해주세요');
    }
    await this.CheckvaildEmail({ email });
    // 닉네임 중복확인
    const isVailNickName = await this.findnickname({ nickname });
    if (isVailNickName) {
      throw new ConflictException('이미 등록된 닉네임이 존재합니다.');
    }
    await this.WelcomeTemplate({ email, nickname });
    //해쉬 비밀번호
    const hashedPassword = await this.getHashedPwd({ password });

    return this.UserRepository.save({
      email,
      password: hashedPassword,
      nickname,
    });
  }
}
