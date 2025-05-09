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
import { CreateOrUpdateSubCategoryDto } from '../dto/subCategory.dto';
import { CrudSubcategoryUseCase } from '../useCase/crudSubCategoryUseCase.useCase';
import { GetAllSubCategoriesPaginatedUseCase } from '../useCase/getAllSubCategoryPaginatedUseCase.useCase';

@ApiTags('subcategory')
@Controller('subcategory')
export class SubCategoryController {
  constructor(
    private readonly crudSubCategoryUserCase: CrudSubcategoryUseCase,
    private readonly getAllSubCategoriesPaginatedUseCase: GetAllSubCategoriesPaginatedUseCase,
  ) {}
  @Post('/create')
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body()
    categoryDto: CreateOrUpdateSubCategoryDto,
  ): Promise<CreatedResponse> {
    const category = await this.crudSubCategoryUserCase.create(categoryDto);
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
    @Body() subCategoryDto: CreateOrUpdateSubCategoryDto,
  ): Promise<UpdatedResponse> {
    await this.crudSubCategoryUserCase.update(subCategoryDto);

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
    await this.crudSubCategoryUserCase.delete(id);
    return {
      message: DELETED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/whit-pagination')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllPagination(@Query() params: PaginateQueryRaw) {
    return await this.getAllSubCategoriesPaginatedUseCase.getAllSubCategoriesPaginated(
      params,
    );
  }
}
