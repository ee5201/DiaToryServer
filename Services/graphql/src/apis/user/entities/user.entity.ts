import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardComment } from 'src/apis/BoardComment/entities/boardComment.entity';
import { Diary } from 'src/apis/diary/entities/diary.entity';
import { Reviewboard } from 'src/apis/reviewboards/entities/reviewboard.entity';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToOne,
  OneToMany,
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

  @OneToMany(() => Diary, (diary) => diary.user, {
    onDelete: 'CASCADE',
  })
  @OneToMany(() => Reviewboard, (reviewboard) => reviewboard.user, {
    onDelete: 'CASCADE',
  })
  reviewboard: [Reviewboard];

  @OneToMany(() => BoardComment, (boardcomment) => boardcomment.user, {
    onDelete: 'CASCADE',
  })
  @Field(() => BoardComment)
  boardcomment: BoardComment;
  diary: Diary[];
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  DeleteAt: Date;
}
