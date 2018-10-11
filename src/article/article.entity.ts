import { Categorys } from '../category/category.entity';
import { Tags } from '../tag/tag.entity';
import { Users } from '../user/user.entity';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  ManyToMany,
  JoinTable,
} from 'typeorm';

@Entity()
export class Articles {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 50 })
  title: string;

  @Column({ length: 100 })
  desc: string;

  @Column({ type: 'longtext' })
  content: string;

  @ManyToOne(type => Users, user => user.articles)
  user: Users;

  @ManyToOne(type => Categorys, categorys => categorys.articles)
  category: Categorys;

  @ManyToMany(type => Tags, tags => tags.articles)
  @JoinTable()
  tags: Tags[];

  @Column({
    name: 'create_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createAt: Date;

  @Column({
    name: 'update_at',
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updateAt: Date;
}
