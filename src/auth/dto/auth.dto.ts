import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class AuthDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  email: string;

  @ApiProperty({
    type: String,
    required: true,
    example: 'hola123',
  })
  password: string;
}

export class RefreshTokenDto {
  @ApiProperty({
    type: String,
    required: true,
  })
  @IsString()
  accesToken: string;
}
