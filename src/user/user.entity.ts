import { Articles } from '../article/article.entity';
import { Categorys } from '../category/category.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 20 })
  username: string;

  @Column({ length: 18 })
  password: string;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100, default: '' })
  desc: string;

  @Column({ type: 'int', name: 'is_super', default: 0 })
  isSuper: number;

  @OneToMany(type => Articles, articles => articles.user)
  articles: Articles[];

  @OneToMany(type => Categorys, categorys => categorys.user)
  categorys: Categorys[];

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
