import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ example: 'shirt', required: true })
  @IsString()
  title: string;

  @ApiProperty({ example: 'shirt description', required: true })
  @IsString()
  description: string;

  @ApiProperty({ example: 10000, required: true })
  @IsNumber()
  price: number;

  @ApiProperty({ example: 10, required: true })
  @IsNumber()
  stock: number;
}
