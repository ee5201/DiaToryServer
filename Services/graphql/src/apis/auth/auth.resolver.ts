import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { IContext } from 'src/commons/interface/context';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authserivce: AuthService, //
  ) {}

  //로그인
  @Mutation(() => String)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<string> {
    return this.authserivce.login({ email, password, context });
  }

  //로그아웃
  @UseGuards(GqlAuthGuard('access'))
  @Mutation(() => String)
  Logout(@Context() Context: IContext): Promise<string> {
    const accessToken = {
      access: Context.req.headers.authorization.split('')[1],
    };
    const refreshToken = {
      refresh: Context.req.cookies.split('=')[1],
    };
    return this.authserivce.Logout({ req: Context.req });
  }

  //리프레시
  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => String)
  resotreAccessToken(@Context() context: IContext): string {
    return this.authserivce.restoreAccessToken({ user: context.req.user });
  }
}
