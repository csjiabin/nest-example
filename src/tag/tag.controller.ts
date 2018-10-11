import { CreateTagDto } from './tag.dto';
import { ParseIntPipe } from '../utils/parse-int.pipe';
import { TagService } from './tag.service';
import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Body,
  Query,
  Param,
  UseGuards,
  HttpException,
  HttpStatus,
  Response,
  Render,
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('tag')
@Controller('api/tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}
  @Get('list')
  async allTag(@Query() options): Promise<any> {
    try {
      return await this.tagService.findAll(options);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('add')
  async addTag(@Body() body: CreateTagDto): Promise<any> {
    try {
      return await this.tagService.addTag(body);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('detail/:id')
  // @UseGuards(AuthGuard('bearer'))
  async findTag(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.tagService.findTag(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('delete/:id')
  async deleteTag(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.tagService.deleteTag(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('update/:id')
  async updateTag(
    @Param('id', new ParseIntPipe())
    id,
    @Body() data,
    @Response() res,
  ): Promise<any> {
    try {
      const result = await this.tagService.updateTag({ id }, data);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
