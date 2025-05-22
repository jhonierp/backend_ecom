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
import { SpecificationTypeUseCase } from '../usecase/specificationType.usecase';
import { CreateOrUpdateSpecificationTypeDto } from '../dto/specification-type.dto';
import {
  CreatedResponse,
  DeletedResponse,
  UpdatedResponse,
} from 'src/shared/dto/response.dto';
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/const/response.conts';
import { SpecificationTypeEntity } from 'src/shared/entities/specificationType.entity';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@ApiTags('specification-type')
@Controller('specification-type')
export class SpecificationTypeController {
  constructor(
    private readonly specificationTypeUseCase: SpecificationTypeUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body()
    specificationTypeDto: CreateOrUpdateSpecificationTypeDto,
  ): Promise<CreatedResponse> {
    const specificationType =
      await this.specificationTypeUseCase.createSpecificationType(
        specificationTypeDto,
      );
    return {
      message: CREATED_MESSAGE,
      id: specificationType.id,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [SpecificationTypeEntity] })
  async findAll() {
    return await this.specificationTypeUseCase.getAllSpecificationTypes();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SpecificationTypeEntity })
  async findOne(@Param('id') id: string) {
    return await this.specificationTypeUseCase.getSpecificationTypeById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdatedResponse })
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateOrUpdateSpecificationTypeDto,
  ): Promise<UpdatedResponse> {
    await this.specificationTypeUseCase.updateSpecificationType({
      ...updateDto,
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
    await this.specificationTypeUseCase.deleteSpecificationType(+id);
    return {
      message: 'Specification type deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
