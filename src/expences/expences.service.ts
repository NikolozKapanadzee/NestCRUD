import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateExpenceDto } from './dto/create-expence-dto';

@Injectable()
export class ExpencesService {
  private expences = [
    {
      id: 1,
      category: 'groceries',
      productName: 'beef',
      quantity: 2,
      price: 15,
      get totalPrice() {
        return this.quantity * this.price;
      },
    },
    {
      id: 2,
      category: 'groceries',
      productName: 'chicken',
      quantity: 1,
      price: 10,
      get totalPrice() {
        return this.quantity * this.price;
      },
    },
  ];

  getAllExpences() {
    return this.expences;
  }
  getExpenceById(id: Number) {
    const expence = this.expences.find((el) => el.id === id);
    return expence;
  }
  createExpence({ category, productName, quantity, price }: CreateExpenceDto) {
    if (
      !category?.trim() ||
      !productName?.trim() ||
      typeof quantity !== 'number' ||
      typeof price !== 'number'
    ) {
      throw new HttpException(
        'All fields are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const lastId = this.expences[this.expences.length - 1]?.id || 0;
    const newExpence = {
      id: lastId + 1,
      category,
      productName,
      quantity,
      price,
      get totalPrice() {
        return this.quantity * this.price;
      },
    };
    this.expences.push(newExpence);
    return 'created successfully';
  }
}
