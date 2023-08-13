import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { IContext } from 'src/commons/interface/context';
import { Token } from './dto/Objectauth-service';

@Resolver()
export class AuthResolver {
  constructor(
    private readonly authserivce: AuthService, //
  ) {}

  //로그인
  @Mutation(() => Token)
  login(
    @Args('email') email: string,
    @Args('password') password: string,
    @Context() context: IContext,
  ): Promise<Token> {
    return this.authserivce.login({ email, password, context });
  }

  //로그아웃
  @Mutation(() => String)
  logout(@Context() Context: IContext): Promise<string> {
    return this.authserivce.Logout({ req: Context.req });
  }

  //리프레시
  @UseGuards(GqlAuthGuard('refresh'))
  @Mutation(() => Token)
  async resotreAccessToken(@Context() context: IContext): Promise<Token> {
    const accessToken = await this.authserivce.restoreAccessToken({
      user: context.req.user,
    });
    return accessToken;
  }
}
