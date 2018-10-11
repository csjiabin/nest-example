import { Articles } from './article.entity';
import { CategoryService } from '../category/category.service';
import { getRepository, createQueryBuilder, Repository, Like } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from '../user/user.entity';
import { UserService } from '../user/user.service';
import * as xss from 'xss';
@Injectable()
export class ArticleService {
  private readonly users: Users;
  constructor(
    @InjectRepository(Articles)
    private readonly articlesRepository: Repository<Articles>,
    private readonly userService: UserService,
    private readonly categoryService: CategoryService,
  ) {}
  async findAll(options): Promise<any> {
    const pagesize = Number(options.pagesize) || 10;
    const page = Number(options.page) * pagesize || 0;
    const orderByCreateAt = options.currentSortOrder
      ? options.currentSortOrder.toUpperCase()
      : 'DESC';
    let params = {};
    let term = '';
    if (options.search) {
      (term =
        'articles.title Like :title OR articles.desc Like :desc OR articles.content Like :content'),
        (params = {
          title: `%${options.search}%`,
          desc: `%${options.search}%`,
          content: `%${options.search}%`,
        });
    }
    const [list, count = 0] = await getRepository(Articles)
      .createQueryBuilder('articles')
      .leftJoinAndSelect('articles.user', 'user')
      .leftJoinAndSelect('articles.category', 'category')
      .leftJoinAndSelect('articles.tags', 'tags')
      .where(term, params)
      .orderBy({
        'articles.create_at': orderByCreateAt,
      })
      .offset(page)
      .limit(pagesize)
      .getManyAndCount();
    return { list, count };
  }
  async addArticle(options): Promise<any> {
    const article = this.articlesRepository.create();
    const user = await this.userService.findUser(options.userId);
    if (options.categoryId) {
      const category = await this.categoryService.findCategory(
        options.categoryId,
      );
      article.category = category;
    }
    const option = {
      whiteList: {
        pre: ['class'],
        code: ['class'],
        div: ['class'],
        span: ['class'],
        a: ['href'],
        p: [],
        img: ['src', 'alt', 'title'],
      },
    };
    options.content = xss(options.content, option);
    Object.keys(options).forEach(key => {
      if (key !== ('userId' || 'categoryId')) article[key] = options[key];
    });
    article.user = user;
    return await this.articlesRepository.save(article);
  }
  async findArticle(id: number): Promise<any> {
    return await this.articlesRepository.findOneOrFail({
      relations: ['user', 'category', 'tags'],
      where: {
        id,
      },
    });
  }
  async deleteArticle(id: number): Promise<any> {
    return await this.articlesRepository.delete({ id });
  }
  async updateArticle(id, options): Promise<any> {
    const article = await this.articlesRepository.findOneOrFail({ id });
    const user = await this.userService.findUser(options.userId);
    if (options.categoryId) {
      const category = await this.categoryService.findCategory(
        options.categoryId,
      );
      options.categoryId = category.id
    }
    options.userId = user.id
    const option = {
      whiteList: {
        pre: ['class'],
        code: ['class'],
        div: ['class'],
        span: ['class'],
        a: ['href'],
        p: [],
        img: ['src', 'alt', 'title'],
      },
    };
    options.content = xss(options.content, option);
    delete options.id
    delete options.tags
    // return article
    console.log(options)
    return await this.articlesRepository.update(id,options);
  }
}
