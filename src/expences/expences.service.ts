import { UpdateExpenceDto } from './dto/update-expence-dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateExpenceDto } from './dto/create-expence-dto';
import { QueryParamsDto } from './dto/query-params.dto';

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
    {
      id: 3,
      category: 'fun',
      productName: 'beer',
      quantity: 5,
      price: 7,
      get totalPrice() {
        return this.quantity * this.price;
      },
    },
    {
      id: 4,
      category: 'technics',
      productName: 'computer',
      quantity: 2,
      price: 2250,
      get totalPrice() {
        return this.quantity * this.price;
      },
    },
  ];

  getAllExpences(queryParams: QueryParamsDto) {
    let filteredExpences = this.expences;
    if (queryParams?.category) {
      filteredExpences = filteredExpences.filter(
        (expense) => expense.category === queryParams.category,
      );
    }
    //batono davit aq ver mivxvdi prices mixevdit gamefiltra tu totalPrices mixedvit da totalPrice avirchie sabolood
    if (queryParams?.priceFrom && queryParams?.priceTo) {
      filteredExpences = filteredExpences.filter(
        (expense) =>
          expense.totalPrice >= queryParams.priceFrom &&
          expense.totalPrice <= queryParams.priceTo,
      );
    } else if (queryParams?.priceFrom) {
      filteredExpences = filteredExpences.filter(
        (expense) => expense.totalPrice >= queryParams.priceFrom,
      );
    } else if (queryParams?.priceTo) {
      filteredExpences = filteredExpences.filter(
        (expense) => expense.totalPrice <= queryParams.priceTo,
      );
    }
    return filteredExpences;
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
  deleteUserById(id: number) {
    const index = this.expences.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found');
    }
    this.expences.splice(index, 1);
    return 'deleted succesfully';
  }
  updateUserById(id: number, UpdateExpenceDto: UpdateExpenceDto) {
    const index = this.expences.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found');
    }
    if (UpdateExpenceDto.category) {
      this.expences[index].category = UpdateExpenceDto.category;
    }
    if (UpdateExpenceDto.productName) {
      this.expences[index].productName = UpdateExpenceDto.productName;
    }
    if (UpdateExpenceDto.price) {
      this.expences[index].price = UpdateExpenceDto.price;
    }
    if (UpdateExpenceDto.quantity) {
      this.expences[index].quantity = UpdateExpenceDto.quantity;
    }
    return 'updated succesfully';
  }
}
