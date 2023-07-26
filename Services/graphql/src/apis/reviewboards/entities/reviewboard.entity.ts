import { Field, Int, ObjectType } from '@nestjs/graphql';
import { BoardComment } from 'src/apis/BoardComment/entities/boardComment.entity';
import { User } from 'src/apis/user/entities/user.entity';
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
export class Reviewboard {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  title: string;
  @Column()
  @Field(() => String)
  contents: string;
  @Column({ default: 0 })
  @Field(() => Int)
  likescount?: number;
  @Column({ default: 0 })
  @Field(() => Int)
  dislikescount?: number;
  @JoinColumn()
  @ManyToOne(() => User, (user) => user.reviewboard, {
    onDelete: 'CASCADE',
  })
  @Field(() => User)
  user: User;
  @OneToMany(() => BoardComment, (boardcomment) => boardcomment.reviewboard, {
    onDelete: 'CASCADE',
  })
  @Field(() => BoardComment)
  boardcomment: BoardComment;

  @JoinTable()
  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
