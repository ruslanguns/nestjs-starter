import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class CreateUserMetadataDto {
  @ApiProperty({ description: 'Not necessary on create but mandatory in update metadata.' })
  @IsOptional()
  id?: number;

  @ApiProperty({ description: 'En este campo administraremos el nombre del campo personalizado.' })
  @IsString()
  @IsOptional()
  key?: string;

  @ApiProperty({ description: 'En este campo administraremos el valor del campo personalizado.' })
  @IsString()
  @IsOptional()
  value?: string;

  constructor(key: string, value: string) {
    this.key = key;
    this.value = value;
  }
}
