import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
  IsArray,
  IsOptional,
  Min,
  ValidateIf,
} from 'class-validator';
import { PartialType, ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({
    description: 'The name of the product',
  })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({
    description: 'The description of the product',
  })
  @IsString()
  @IsNotEmpty()
  readonly description: string;

  @ApiProperty({
    description: 'The price of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  @IsPositive()
  readonly price: number;

  @ApiProperty({
    description: 'The stock quantity of the product',
  })
  @IsNumber()
  @IsNotEmpty()
  readonly stock: number;

  @ApiProperty({
    description: 'The url of the product image',
  })
  @IsUrl()
  @IsNotEmpty()
  readonly image: string;

  @ApiProperty({
    description: 'The id of the product brand',
  })
  @IsNotEmpty()
  @IsPositive()
  readonly brandId: number;

  @ApiProperty({
    description: 'The ids of the categories for the product',
  })
  @IsArray()
  @IsNotEmpty()
  readonly categoriesIds: number[];
}

export class UpdateProductDto extends PartialType(CreateProductDto) {}

export class FilterProductsDto {
  //cantidad de productos
  @IsOptional()
  @IsPositive()
  limit: number;
  //Desde que lugar
  @IsOptional()
  @Min(0)
  offset: number;
  @IsOptional()
  @IsPositive()
  minPrice: number;
  @ValidateIf((item) => item.minPrice)
  @IsPositive()
  maxPrice: number;
}
