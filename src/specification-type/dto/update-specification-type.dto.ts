import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecificationTypeDto } from './create-specification-type.dto';

export class UpdateSpecificationTypeDto extends PartialType(CreateSpecificationTypeDto) {}
