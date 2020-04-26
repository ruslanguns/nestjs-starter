import { IsString, IsNotEmpty } from 'class-validator';
import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({
    description: 'You can use a valid email or an user',
    example: 'foo@bar.com',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  username: string;

  @ApiProperty({
    description: 'Your account password',
    example: '123456',
    required: true,
  })
  @Expose()
  @IsString()
  @IsNotEmpty()
  password: string;
}
