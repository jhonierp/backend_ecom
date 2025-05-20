import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TitleEntity } from '../shared/entities/title.entity';
import { CrudTitleService } from './services/crudTitle.service';
import { TitleController } from './controllers/title.controller';
import { TitleUseCase } from './usecase/title.usecase';

@Module({
  imports: [TypeOrmModule.forFeature([TitleEntity])],
  providers: [CrudTitleService, TitleUseCase],
  controllers: [TitleController],
  exports: [CrudTitleService, TitleUseCase],
})
export class TitleModule {}
