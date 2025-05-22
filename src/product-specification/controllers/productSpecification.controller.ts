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
import { ProductSpecificationUseCase } from '../usecase/productSpecification.usecase';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateOrUpdateProductSpecificationDto } from '../dto/product-specification.dto';
import {
  CreatedResponse,
  DeletedResponse,
  UpdatedResponse,
} from 'src/shared/dto/response.dto';
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/const/response.conts';
import { ProductSpecificationEntity } from 'src/shared/entities/productEspecification.entity';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@ApiTags('product-specification')
@Controller('product-specification')
export class ProductSpecificationController {
  constructor(
    private readonly productSpecificationUseCase: ProductSpecificationUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiCreatedResponse({ type: CreatedResponse })
  async create(
    @Body() createDto: CreateOrUpdateProductSpecificationDto,
  ): Promise<CreatedResponse> {
    const productSpecification =
      await this.productSpecificationUseCase.createProductSpecification(
        createDto,
      );
    return {
      message: CREATED_MESSAGE,
      statusCode: HttpStatus.CREATED,
      id: productSpecification.id,
    };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [ProductSpecificationEntity] })
  async findAll() {
    return await this.productSpecificationUseCase.getAllProductSpecifications();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: ProductSpecificationEntity })
  async findOne(@Param('id') id: string): Promise<ProductSpecificationEntity> {
    return await this.productSpecificationUseCase.getProductSpecificationById(
      +id,
    );
  }

  @Get('product/:productId')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [ProductSpecificationEntity] })
  async findByProductId(
    @Param('productId') productId: string,
  ): Promise<ProductSpecificationEntity[]> {
    return await this.productSpecificationUseCase.getProductSpecificationsByProductId(
      +productId,
    );
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: UpdatedResponse })
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateOrUpdateProductSpecificationDto,
  ): Promise<UpdatedResponse> {
    await this.productSpecificationUseCase.updateProductSpecification({
      ...updateDto,
      id: +id,
    });
    return {
      message: UPDATED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @ApiOkResponse({ type: DeletedResponse })
  async remove(@Param('id') id: string): Promise<DeletedResponse> {
    await this.productSpecificationUseCase.deleteProductSpecification(+id);
    return {
      message: 'Product specification deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
