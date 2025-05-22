import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateOrUpdateTitleDto } from '../dto/title.dto';
import { TitleUseCase } from '../usecase/title.usecase';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@ApiTags('title')
@ApiBearerAuth()
@Controller('title')
export class TitleController {
  constructor(private readonly titleUseCase: TitleUseCase) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  create(@Body() createTitleDto: CreateOrUpdateTitleDto) {
    return this.titleUseCase.createTitle(createTitleDto);
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  update(
    @Param('id') id: string,
    @Body() updateTitleDto: CreateOrUpdateTitleDto,
  ) {
    return this.titleUseCase.updateTitle({ ...updateTitleDto, id: +id });
  }

  @Get()
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findAll() {
    return this.titleUseCase.getAllTitles();
  }

  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  findOne(@Param('id') id: string) {
    return this.titleUseCase.getTitleById(+id);
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  remove(@Param('id') id: string) {
    return this.titleUseCase.deleteTitle(+id);
  }
}
