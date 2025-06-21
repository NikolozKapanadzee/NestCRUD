import { Transform } from 'class-transformer';
import { IsIn, IsNumber, IsOptional, Max } from 'class-validator';

export class QueryParamsDto {
  @IsOptional()
  @Transform(({ value }) => Math.max(Number(value), 1))
  @IsNumber()
  page: number = 1;

  @IsOptional()
  @Transform(({ value }) => Math.min(Number(value), 30))
  @IsNumber()
  take: number = 30;

  @IsOptional()
  @IsIn(['groceries', 'fun', 'technics'], { message: 'Unknown category' })
  category: string;
}
