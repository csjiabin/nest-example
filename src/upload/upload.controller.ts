import {
  Controller,
  Post,
  UseInterceptors,
  FileInterceptor,
  FilesInterceptor,
  UploadedFile,
  UploadedFiles,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { UploadService } from './upload.service';
@Controller('api/upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Post('file')
  @UseInterceptors(FileInterceptor('file'))
  async uploadedFile(@UploadedFile() file): Promise<any> {
    try {
      return await this.uploadService.saveFile(file);
    } catch (error) {
      throw new HttpException({ error }, HttpStatus.BAD_REQUEST);
    }
  }
  @Post('files')
  @UseInterceptors(FilesInterceptor('files'))
  async uploadFile(@UploadedFiles() files): Promise<any> {
    console.log(files);
    if (files) {
      return { msg: '上传成功' };
    }
    throw new HttpException('上传失败', HttpStatus.BAD_REQUEST);
  }
}
