import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/createUserInput';
import { CheckAuthNumberInput } from './dto/checkauthnumberInput';
import { UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { IContext } from 'src/commons/interface/context';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}
  // 유저 정보 불러오기
  // @Query(() => [User])
  // fetchusers(): Promise<User[]> {
  //   return this.userService.fetchAll();
  // }

  //로그인 회원 조회
  @UseGuards(GqlAuthGuard('access'))
  @Query(() => User)
  fetchUser(@Context() context: IContext): Promise<User> {
    console.log(context.req.user);
    return this.userService.findOneByUser({ userId: context.req.user.id });
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
  CreateUser(@Args('SignUpUser') createUserInput: CreateUserInput) {
    return this.userService.createUserInput({ createUserInput });
  }

  //이메일 확인 로직
}
