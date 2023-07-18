import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { Phone } from './entities/phone.entity';
import { PhoneService } from './phone.service';

import { CreatePhoneInput } from './dto/createPhoneInput';
import { Code } from 'typeorm';

@Resolver()
export class PhoneResolver {
  constructor(private readonly phoneService: PhoneService) {}
  @Query(() => [Phone])
  fetchPhone(): Promise<Phone[]> {
    return this.phoneService.fetchAll();
  }

  @Mutation(() => String)
  phone(@Args('phone') phone: string): Promise<string> {
    return this.phoneService.createPhoneNum({ phone });
  }
  @Mutation(() => String)
  vaildtaion(@Args('code') code: string) {
    return this.phoneService.validcode({ code });
  }
}
