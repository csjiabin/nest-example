import { AppService } from './app.service';
import { Controller, Get, Render } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @Render('index')
  root(): any {
    return this.appService.root();
  }
}
