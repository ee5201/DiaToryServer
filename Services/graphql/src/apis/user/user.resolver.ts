import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUserInput';
import { CreatePhoneInput } from './dto/createPhoneInput';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  @Query(() => [User])
  fetchusers(): Promise<User[]> {
    return this.userService.fetchAll();
  }
  @Mutation(() => User)
  signup(@Args('SignUpUser') createSign: CreateUserInput) {
    return this.userService.createUser({ createSign });
  }
}
