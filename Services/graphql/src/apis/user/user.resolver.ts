import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUserInput';
import { CheckAuthNumberInput } from './dto/checkauthnumberInput';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  // 유저 정보 불러오기
  @Query(() => [User])
  fetchusers(): Promise<User[]> {
    return this.userService.fetchAll();
  }

  //닉네임 중복 확인
  @Query(() => User)
  isVailNickName(@Args('nickname') nickname: string) {
    return this.userService.findnickname({ nickname });
  }

  //이메일 DB유무 확인
  @Query(() => User)
  isVailEmail(@Args('email') email: string) {
    return this.userService.CheckvaildEmail({ email });
  }

  //이메일 전송하기
  @Mutation(() => User)
  async sendEmail(@Args('email') email: string): Promise<string> {
    return this.userService.sendEmail({ email });
  }

  //이메일 인증번호 확인하기
  @Mutation(() => String)
  async CheckAuthNumber(
    @Args('checkAuthNumberInput') checkAuthNumberInput: CheckAuthNumberInput,
  ) {
    return this.userService.CheckAuthNumber({ checkAuthNumberInput });
  }

  //회원가입
  @Mutation(() => User)
  CreateUser(@Args('SignUpUser') createSign: CreateUserInput) {
    return this.userService.createUser({ createSign });
  }

  //이메일 확인 로직
}
