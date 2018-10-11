import { AuthGuard } from '@nestjs/passport';
import { ParseIntPipe } from '../utils/parse-int.pipe';
import { UserDto } from './user.dto';
import { UserInterface } from './user.interface';
import { UserService } from './user.service';
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
} from '@nestjs/common';
import { ApiUseTags } from '@nestjs/swagger';
@ApiUseTags('user')
@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get('list')
  async allUser(@Query() options: UserInterface): Promise<any> {
    try {
      return await this.userService.findAll(options);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('add')
  async addUser(@Body() body: UserDto): Promise<any> {
    try {
      return await this.userService.addUser(body);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Get('detail/:id')
  // @UseGuards(AuthGuard('bearer'))
  async findUser(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.userService.findUser(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Delete('delete/:id')
  async deleteUser(
    @Param('id', new ParseIntPipe())
    id,
  ): Promise<any> {
    try {
      return await this.userService.deleteUser(id);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Put('update/:id')
  async updateUser(
    @Param('id', new ParseIntPipe())
    id,
    @Body() data: UserDto,
    @Response() res,
  ): Promise<any> {
    try {
      const result = await this.userService.updateUser(id, data);
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
}
