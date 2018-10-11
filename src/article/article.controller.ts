import { ArticleService } from './article.service';
import { ParseIntPipe } from '../utils/parse-int.pipe';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpException,
  HttpStatus,
  Delete,
  Put,
  Response
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('article')
@Controller('api/article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
  @Post('list')
  async allArticle(@Body() options): Promise<any> {
    try {
      return await this.articleService.findAll(options);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('add')
  async addArticle(@Body() body): Promise<any> {
    try {
      return await this.articleService.addArticle(body);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('detail/:id')
  async findArticle(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.articleService.findArticle(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('delete/:id')
  async deleteArticle(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.articleService.deleteArticle(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('update/:id')
  async updateArticle(
    @Param('id', new ParseIntPipe())
    id,
    @Body() data,
    @Response() res,
  ): Promise<any> {
    try {
      const result = await this.articleService.updateArticle(id, data);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
