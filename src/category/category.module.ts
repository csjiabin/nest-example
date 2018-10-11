import { CategoryController } from './category.controller';
import { Categorys } from './category.entity';
import { CategoryService } from './category.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Categorys])],
  controllers: [CategoryController],
  providers: [CategoryService],
  exports: [CategoryService],
})
export class CategoryModule {
  constructor(private readonly categoryService: CategoryService) {}
}
