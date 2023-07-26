import { Field, Float, ObjectType } from '@nestjs/graphql';
import { FileUpload } from 'graphql-upload';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
