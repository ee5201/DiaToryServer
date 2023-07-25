import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserMoudle } from './apis/user/user.module';
import { MailerModule } from '@nest-modules/mailer';
import { RedisClientOptions } from 'redis';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './apis/auth/auth.module';
import { DiaryModule } from './apis/diary/diary.module';
import { DiarycategoryModule } from './apis/diaryCategories/diaryCategory.module';

@Module({
  imports: [
    UserMoudle,
    AuthModule,
    DiaryModule,
    DiarycategoryModule,
    ConfigModule.forRoot(),
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      useFactory: () => ({
        autoSchemaFile: 'src/commons/graphql/schema.gql',
        context: ({ req, res }) => ({ req, res }),
        cors: {
          origin: [
            'http://localhost:3000',
            'http://localhost:3001',
            'http://127.0.0.1:3000',
            'http://127.0.0.1:3001',
            'https://storage.googleapis.com',
          ],
          credentials: true,
        },
        uploads: false,
      }),
    }),
    TypeOrmModule.forRoot({
      type: process.env.DATABASE_TYPE as 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'], // __ditname현재 디렉토리 위치 에 apis에서 샅샅이 찾는다.
      logging: true,
      migrationsRun: false,
      synchronize: true,
    }),
    CacheModule.register<RedisClientOptions>({
      store: redisStore,
      url: 'redis://diaory-redis:6379',
      isGlobal: true,
    }),

    MailerModule.forRootAsync({
      useFactory: () => ({
        transport: {
          service: 'Gmail',
          host: process.env.EMAIL_HOST,
          port: Number(process.env.MAILER_PORT),
          secure: false, // upgrade later with STARTTLS
          auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
          },
        },
      }),
    }),
  ],
})
export class AppModule {}
