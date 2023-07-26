import { Field, Int, ObjectType } from '@nestjs/graphql';
import { DiaryCategory } from 'src/apis/diaryCategories/entities/diarycategory.entity';
import { FilesImages } from 'src/apis/files/entities/files.entity';
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
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
@ObjectType()
export class Diary {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;
  @Field(() => String)
  @Column()
  title: string;

  @Field(() => String)
  @Column()
  contents: string;

  @JoinColumn()
  @ManyToOne(() => User, (user) => user.diary, {
    onDelete: 'CASCADE',
  })
  @Field(() => User, { nullable: true })
  user: User;
  @ManyToOne(() => DiaryCategory)
  @Field(() => DiaryCategory, { nullable: true })
  diaryCategory: DiaryCategory;
  @OneToMany(() => FilesImages, (fileimage) => fileimage.user, {
    onDelete: 'CASCADE',
  })
  @Field(() => FilesImages)
  fileImages: FilesImages;

  @CreateDateColumn()
  createAt: Date;
  @DeleteDateColumn()
  deleteAt: Date;
}
