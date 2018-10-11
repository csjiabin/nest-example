import { Articles } from '../article/article.entity';
import { Users } from '../user/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Categorys {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'int', default: 99999 })
  index: string;

  @OneToMany(type => Articles, articles => articles.category)
  articles: Articles[];

  @ManyToOne(type => Users, user => user.categorys)
  user: Users;

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
