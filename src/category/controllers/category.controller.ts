import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { CrudCategoryUseCase } from '../useCase/crudCategoryUseCase.useCase';

import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CreatedResponse,
  DeletedResponse,
  UpdatedResponse,
} from 'src/shared/dto/response.dto';
import {
  CREATED_MESSAGE,
  DELETED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/const/response.conts';
import { AuthGuard } from 'src/shared/guards/auth.guard';

import { PaginateQueryRaw } from 'src/shared/interfaces/paginated';
import { CreateOrUpdateCategoryDto } from '../dto/category.dto';
import { GetAllCategoriesPaginatedUseCase } from '../useCase/getAllCategoryPaginatedUseCase.useCase';

@ApiTags('category')
@Controller('category')
export class CategoryController {
  constructor(
    private readonly crudCategoryUserCase: CrudCategoryUseCase,
    private readonly getAllCategoriesPaginatedUseCase: GetAllCategoriesPaginatedUseCase,
  ) {}
  @Post('/create')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body()
    categoryDto: CreateOrUpdateCategoryDto,
  ): Promise<CreatedResponse> {
    const category = await this.crudCategoryUserCase.create(categoryDto);
    return {
      message: CREATED_MESSAGE,
      id: category,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Patch('/update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdatedResponse })
  async update(
    @Body() categoryDto: CreateOrUpdateCategoryDto,
  ): Promise<UpdatedResponse> {
    await this.crudCategoryUserCase.update(categoryDto);

    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete('/:id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: DeletedResponse })
  async delete(@Param('id') id: number): Promise<DeletedResponse> {
    await this.crudCategoryUserCase.delete(id);
    return {
      message: DELETED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/with-pagination')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllPagination(@Query() params: PaginateQueryRaw) {
    return await this.getAllCategoriesPaginatedUseCase.getAllCategoriesPaginated(
      params,
    );
  }
}
