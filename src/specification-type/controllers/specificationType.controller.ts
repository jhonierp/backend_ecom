import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { SpecificationTypeUseCase } from '../usecase/specificationType.usecase';
import { CreateOrUpdateSpecificationTypeDto } from '../dto/specification-type.dto';
import { CreatedResponse, DeletedResponse, UpdatedResponse } from 'src/shared/dto/response.dto';
import { CREATED_MESSAGE, UPDATED_MESSAGE } from 'src/shared/const/response.conts';
import { SpecificationTypeEntity } from 'src/shared/entities/specificationType.entity';

@ApiTags('specification-type')
@Controller('specification-type')
export class SpecificationTypeController {
  constructor(
    private readonly specificationTypeUseCase: SpecificationTypeUseCase,
  ) {}

  @Post()
  @ApiBearerAuth()
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body()
    specificationTypeDto: CreateOrUpdateSpecificationTypeDto,
  ): Promise<CreatedResponse> {
    const specificationType = await this.specificationTypeUseCase.createSpecificationType(specificationTypeDto);
    return {
      message: CREATED_MESSAGE,
      id: specificationType.id,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiBearerAuth()
  @ApiOkResponse({ type: [SpecificationTypeEntity] })
  async findAll() {
    return await this.specificationTypeUseCase.getAllSpecificationTypes();
  }

  @Get(':id')
  @ApiBearerAuth()
  @ApiOkResponse({ type: SpecificationTypeEntity })
  async findOne(@Param('id') id: string) {
    return await this.specificationTypeUseCase.getSpecificationTypeById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
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
  @ApiOkResponse({ type: DeletedResponse })
  async remove(@Param('id') id: string): Promise<DeletedResponse> {
    await this.specificationTypeUseCase.deleteSpecificationType(+id);
    return {
      message: 'Specification type deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
