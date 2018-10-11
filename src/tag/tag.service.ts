import { createQueryBuilder, getRepository, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tags } from './tag.entity';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';
@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tags) private readonly tagsRepository: Repository<Tags>,
    private readonly userService: UserService,
  ) {}
  async findAll(options): Promise<any> {
    const pagesize = Number(options.pagesize) || 10;
    const page = Number(options.page) * pagesize || 0;
    const [list = [], count = 0] = await this.tagsRepository.findAndCount({
      // select: ['id', 'name'],
      relations: ['user', 'articles'],
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
  async addTag(options): Promise<any> {
    const user = await this.userService.findUser(options.userId);
    const category = this.tagsRepository.create();
    Object.keys(options).forEach(key => {
      if (key !== 'userId') category[key] = options[key];
    });
    category.user = user;
    return await this.tagsRepository.save(category);
  }
  async findTag(id: number): Promise<any> {
    return await this.tagsRepository.findOneOrFail({
      where: {
        id,
      },
      relations: ['user'],
    });
  }
  async deleteTag(id: number): Promise<any> {
    return await this.tagsRepository.delete({ id });
  }
  async updateTag(id, options): Promise<any> {
    const category = await this.tagsRepository.findOneOrFail({ id });
    return await this.tagsRepository.update(id, options);
  }
}
