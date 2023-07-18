import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Phone {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String, { nullable: true })
  id: string;
  @Field(() => String)
  @Column()
  phone: string;
  @Field(() => String)
  @Column()
  code: string;

  @CreateDateColumn()
  createAt: Date;

  @DeleteDateColumn()
  DeleteAt: Date;
}
