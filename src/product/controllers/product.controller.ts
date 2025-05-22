import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CrudProductUseCase } from '../useCase/crudProductUseCase.useCase';
import { CreateOrUpdateProductDto } from '../dto/product.dto';
import {
  CreatedResponse,
  DeletedResponse,
  UpdatedResponse,
} from 'src/shared/dto/response.dto';
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/const/response.conts';
import { ProductEntity } from 'src/shared/entities/product.entity';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@ApiTags('product')
@Controller('product')
export class productController {
  constructor(private readonly crudProductUseCase: CrudProductUseCase) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body() productDto: CreateOrUpdateProductDto,
  ): Promise<CreatedResponse> {
    const product = await this.crudProductUseCase.create(productDto);
    return {
      message: CREATED_MESSAGE,
      id: product.id,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [ProductEntity] })
  async findAll() {
    return await this.crudProductUseCase.findAll();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ProductEntity })
  async findOne(@Param('id') id: string) {
    return await this.crudProductUseCase.findOne(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdatedResponse })
  async update(
    @Param('id') id: string,
    @Body() updateProductDto: CreateOrUpdateProductDto,
  ): Promise<UpdatedResponse> {
    await this.crudProductUseCase.update({
      ...updateProductDto,
      id: +id,
    });
    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: DeletedResponse })
  async remove(@Param('id') id: string): Promise<DeletedResponse> {
    await this.crudProductUseCase.delete(+id);
    return {
      message: 'Product deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
