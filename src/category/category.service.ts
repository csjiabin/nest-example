import { Categorys } from './category.entity';
import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';

@Injectable()
export class CategoryService {
  private readonly categorys: Categorys;
  private readonly users: Users;
  constructor(
    @InjectRepository(Categorys)
    private readonly categorysRepository: Repository<Categorys>,
    private readonly userService: UserService,
  ) {}
  async findAll(options): Promise<any> {
    const pagesize = Number(options.pagesize) || 10;
    const page = Number(options.page) * pagesize || 0;
    const [list = [], count = 0] = await this.categorysRepository.findAndCount({
      // select: ['id', 'name'],
      relations: ['user'],
      // join: {
      //   alias: 'category',
      //   leftJoinAndSelect: {
      //     user: 'category.user',
      //     article: 'user.articles',
      //   },
      // },
      where: {
        ...options,
      },
      skip: page,
      take: pagesize,
    });
    return {
      list: list.map(item => {
        delete item.user.createAt;
        delete item.user.updateAt;
        return item;
      }),
      count,
    };
  }
  async addCategory(options): Promise<any> {
    const user = await this.userService.findUser(options.userId);
    const category = this.categorysRepository.create();
    Object.keys(options).forEach(key => {
      if (key !== 'userId') category[key] = options[key];
    });
    category.user = user;
    return await this.categorysRepository.save(category);
  }
  async findCategory(id: number): Promise<any> {
    return await this.categorysRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['user'],
    });
  }
  async deleteCategory(id: number): Promise<any> {
    return await this.categorysRepository.delete({ id });
  }
  async updateCategory(id, options): Promise<any> {
    const category = await this.categorysRepository.findOneOrFail({ id });
    // if(!category) throw new Error('no category!')
    return await this.categorysRepository.update(id, options);
  }
}
