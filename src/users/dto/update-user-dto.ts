import { IsNumber } from 'class-validator';

export class UpdateUserDto {
  email?: string;
  firstName?: string;
  lastName?: string;
  @IsNumber()
  phoneNumber?: number;
  gender?: string;
}
