import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ArticleModule } from './article/article.module';
import { AuthMiddleware } from './common/middlewares/auth.middleware';
import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { Connection } from 'typeorm';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { TagModule } from './tag/tag.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UploadModule } from './upload/upload.module';
import { UserModule } from './user/user.module';
@Module({
  imports: [
    TypeOrmModule.forRoot(),
    UserModule,
    TagModule,
    AuthModule,
    ArticleModule,
    CategoryModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  constructor(private readonly connection: Connection) {}
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('/auth/*', '/api/*');
  }
}
