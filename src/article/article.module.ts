import { ArticleController } from './article.controller';
import { Articles } from './article.entity';
import { ArticleService } from './article.service';
import { CategoryModule } from '../category/category.module';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Articles]), UserModule, CategoryModule],
  controllers: [ArticleController],
  providers: [ArticleService],
  exports: [ArticleService],
})
export class ArticleModule {
  constructor(private readonly articleService: ArticleService) {}
}
