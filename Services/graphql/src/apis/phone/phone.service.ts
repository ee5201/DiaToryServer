import { ConflictException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IUserServicePhoneUser } from './interface/phone-service';
import coolsms from 'coolsms-node-sdk';

import { Phone } from './entities/phone.entity';

@Injectable()
export class PhoneService {
  constructor(
    @InjectRepository(Phone)
    private readonly PhoneRepository: Repository<Phone>,
  ) {}

  fetchAll(): Promise<Phone[]> {
    return this.PhoneRepository.find();
  }

  fetchcode({ code }) {
    return this.PhoneRepository.findOne({
      where: {
        code,
      },
    });
  }

  fetchphone({ phone }) {
    return this.PhoneRepository.findOne({
      where: {
        phone,
      },
    });
  }

  async createPhoneNum({ phone }): Promise<string> {
    const SMS_KEY = process.env.SMS_KEY;
    const SMS_SECRET = process.env.SMS_SECRET;
    const SMS_SENDER = process.env.SMS_SENDER;

    const mysms = coolsms.default;

    const messageService = new mysms({
      apiKey: SMS_KEY,
      apiSecret: SMS_SECRET,
    });

    if (phone.length === 10 || phone.length === 11) {
      const phoneresult = String(Math.floor(Math.random() * 10 ** 6)).padStart(
        6,
        '0',
      );
      const existPhone = await this.fetchphone({ phone });
      if (existPhone) {
        existPhone.code = phoneresult;
        await this.PhoneRepository.save(existPhone);
        const result = await messageService.send({
          to: phone,
          from: SMS_SENDER,
          text: `인증번호${phoneresult}`,
        });
      } else {
        const newPhone = new Phone();
        newPhone.phone = phone;
        newPhone.code = phoneresult;
        await this.PhoneRepository.save(newPhone);
      }

      return phoneresult;
    }
  }

  async validcode({ code }) {
    const check = await this.fetchcode({ code });
    if (check && check.code === code) {
      throw new ConflictException('인증번호가 일치합니다.');
    } else {
      return '인증번호가 일치하지 않습니다.';
    }
  }
}
