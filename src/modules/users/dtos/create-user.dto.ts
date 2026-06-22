import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, MaxLength, Min } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    required: true,
    maxLength: 128,
    example: 'Tom Cruise',
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  name: string;

  @ApiProperty({
    type: 'number',
    minimum: 12,
    required: true,
    example: 25,
  })
  @IsInt()
  @Min(12)
  age: number;
}
