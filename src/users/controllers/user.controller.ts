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
  Req,
  UseGuards,
} from '@nestjs/common';
import { CrudUserUseCase } from '../useCase/crudUserUseCase.useCase';
import { CreateOrUpdateUserDto } from '../dto/user.dto';
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
import { InitDataUseCase } from '../useCase/initDataUseCase.UseCase';
import { GetAllUsersPaginatedUseCase } from '../useCase/getAllUsersPaginatedUseCase.useCase';
import { PaginateQueryRaw } from 'src/shared/interfaces/paginated';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(
    private readonly crudUserCase: CrudUserUseCase,
    private readonly initDataUseCase: InitDataUseCase,
    private readonly getAllUsersPaginatedUseCase: GetAllUsersPaginatedUseCase,
  ) {}
  @Post('/create')
  @ApiOkResponse({ type: CreatedResponse })
  async create(
    @Body()
    userdto: CreateOrUpdateUserDto,
  ): Promise<CreatedResponse> {
    const user = await this.crudUserCase.create(userdto);
    return {
      message: CREATED_MESSAGE,
      id: user,
      statusCode: HttpStatus.CREATED,
    };
  }

  @Get('/init-data')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async initData(@Req() req) {
    const userId = req.user.id;
    const data = await this.initDataUseCase.initData(userId);
    return data;
  }

  @Patch('/update')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  @ApiOkResponse({ type: UpdatedResponse })
  async update(
    @Body() userDto: CreateOrUpdateUserDto,
  ): Promise<UpdatedResponse> {
    await this.crudUserCase.update(userDto);

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
    await this.crudUserCase.delete(id);
    return {
      message: DELETED_MESSAGE,
      statusCode: HttpStatus.OK,
    };
  }

  @Get('/whit-pagination')
  @ApiBearerAuth()
  @UseGuards(AuthGuard)
  async getAllPagination(@Query() params: PaginateQueryRaw) {
    return await this.getAllUsersPaginatedUseCase.getAllUsersPaginated(params);
  }
}
