import { Field, Float, ObjectType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { Diary } from 'src/apis/diary/entities/diary.entity';
import { User } from 'src/apis/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class FilesImages {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;

  @Column({ default: 0 }) // 기본값 설정
  @Field(() => Float, { nullable: true })
  size: number;

  @Column({ nullable: true }) // nullable로 설정
  @Field(() => String, { nullable: true })
  url: string;
  file: FileUpload;
  @ManyToOne(() => Diary)
  @Field(() => Diary)
  diary: Diary;
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;
}
