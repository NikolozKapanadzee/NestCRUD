import { IsNumber } from 'class-validator';

export class UpdateExpenceDto {
  category?: string;
  productName?: string;
  @IsNumber()
  quantity?: number;
  @IsNumber()
  price?: number;
}
