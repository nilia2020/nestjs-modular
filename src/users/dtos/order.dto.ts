import { IsMongoId, IsNotEmpty, IsArray, IsDate } from 'class-validator';
import { OmitType, PartialType } from '@nestjs/swagger';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsMongoId()
  readonly customer: string;

  @IsDate()
  @IsNotEmpty()
  readonly date: Date;

  @IsArray()
  @IsNotEmpty()
  readonly products: string[];
}

export class UpdateOrderDto extends PartialType(
  OmitType(CreateOrderDto, ['products']),
) {}

export class AddProductsOrderDto {
  @IsArray()
  @IsNotEmpty()
  readonly productsIds: string[];
}
