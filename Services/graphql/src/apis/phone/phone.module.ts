import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import { PhoneResolver } from './phone.resolver';
import { PhoneService } from './phone.service';
import { Phone } from './entities/phone.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Phone])],
  providers: [PhoneResolver, PhoneService],
})
export class PhoneMoudle {}
