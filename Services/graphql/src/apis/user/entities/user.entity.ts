import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Diary } from 'src/apis/diary/entities/diary.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class User {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  email?: string;

  @Column({ nullable: true })
  password?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  nickname?: string;

  @Field(() => String, { nullable: true })
  @Column({ nullable: true })
  phone?: string;

  @Field(() => Int, { nullable: true })
  @Column({ nullable: true })
  age?: number;

  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
}
