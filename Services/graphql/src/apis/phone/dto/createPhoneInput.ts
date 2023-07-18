import { InputType, PartialType } from '@nestjs/graphql';
import { Phone } from '../entities/phone.entity';

@InputType()
export class CreatePhoneInput extends PartialType(Phone, InputType) {}
