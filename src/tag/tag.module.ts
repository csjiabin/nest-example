import { Module } from '@nestjs/common';
import { TagController } from './tag.controller';
import { Tags } from './tag.entity';
import { TagService } from './tag.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';
@Module({
  imports: [UserModule, TypeOrmModule.forFeature([Tags])],
  controllers: [TagController],
  providers: [TagService],
  exports: [TagService],
})
export class TagModule {
  constructor(private readonly tagService: TagService) {}
}
