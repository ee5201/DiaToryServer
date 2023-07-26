import { Field, ObjectType } from '@nestjs/graphql';
import { Reviewboard } from 'src/apis/reviewboards/entities/reviewboard.entity';
import { User } from 'src/apis/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class BoardComment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Column()
  @Field(() => String)
  NickName: string;
  @Column()
  @Field(() => String)
  contents: string;
  @JoinColumn()
  @ManyToOne(() => Reviewboard, (reviewboard) => reviewboard.boardcomment, {
    onDelete: 'CASCADE',
  })
  @Field(() => Reviewboard)
  reviewboard: Reviewboard;
  @ManyToOne(() => User, (user) => user.boardcomment, { onDelete: 'CASCADE' })
  @Field(() => User)
  user: User;
}
