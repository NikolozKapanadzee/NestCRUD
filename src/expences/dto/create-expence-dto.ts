import { IsNotEmpty, isNotEmpty, IsNumber } from 'class-validator';
export class CreateExpenceDto {
  @IsNotEmpty()
  category: string;
  @IsNotEmpty()
  productName: string;
  @IsNotEmpty()
  @IsNumber()
  quantity: number;
  @IsNotEmpty()
  @IsNumber()
  price: number;
}
