import { isNotEmpty, IsNotEmpty, IsNumber } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  firstName: string;
  @IsNotEmpty()
  lastName: string;
  @IsNotEmpty()
  email: string;
  @IsNotEmpty()
  @IsNumber()
  phoneNumber: number;
  @IsNotEmpty()
  gender: string;
}
