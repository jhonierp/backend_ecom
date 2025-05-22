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
import { SpecificationUseCase } from '../usecase/specification.usecase';
import { CreateOrUpdateSpecificationDto } from '../dto/specification.dto';
import {
  CreatedResponse,
  DeletedResponse,
  UpdatedResponse,
} from 'src/shared/dto/response.dto';
import {
  CREATED_MESSAGE,
  UPDATED_MESSAGE,
} from 'src/shared/const/response.conts';
import { SpecificationEntity } from 'src/shared/entities/specification.entity';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@ApiTags('specification')
@Controller('specification')
export class SpecificationController {
  constructor(private readonly specificationUseCase: SpecificationUseCase) {}

  @Post()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body()
    specificationDto: CreateOrUpdateSpecificationDto,
  ): Promise<CreatedResponse> {
    const specification =
      await this.specificationUseCase.createSpecification(specificationDto);
    return {
      message: CREATED_MESSAGE,
      id: specification.id,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get()
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: [SpecificationEntity] })
  async findAll() {
    return await this.specificationUseCase.getAllSpecifications();
  }

  @Get(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: SpecificationEntity })
  async findOne(@Param('id') id: string) {
    return await this.specificationUseCase.getSpecificationById(+id);
  }

  @Put(':id')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdatedResponse })
  async update(
    @Param('id') id: string,
    @Body() updateDto: CreateOrUpdateSpecificationDto,
  ): Promise<UpdatedResponse> {
    await this.specificationUseCase.updateSpecification({
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
    await this.specificationUseCase.deleteSpecification(+id);
    return {
      message: 'Specification deleted successfully',
      statusCode: HttpStatus.OK,
    };
  }
}
