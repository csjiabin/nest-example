import { CategoryService } from './category.service';
import { ParseIntPipe } from '../utils/parse-int.pipe';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  Param,
  HttpException,
  HttpStatus,
  Response,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('category')
@Controller('api/category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}
  @Get('list')
  async allCategory(@Query() options): Promise<any> {
    try {
      return await this.categoryService.findAll(options);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('add')
  async addCategory(@Body() body): Promise<any> {
    try {
      return await this.categoryService.addCategory(body);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('detail/:id')
  // @UseGuards(AuthGuard('bearer'))
  async findCategory(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.categoryService.findCategory(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('delete/:id')
  async deleteCategory(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.categoryService.deleteCategory(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('update/:id')
  async updateCategory(
    @Param('id', new ParseIntPipe())
    id,
    @Body() data,
    @Response() res,
  ): Promise<any> {
    try {
      const result = await this.categoryService.updateCategory({ id }, data);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
