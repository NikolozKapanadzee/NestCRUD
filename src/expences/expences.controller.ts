import { CreateExpenceDto } from './dto/create-expence-dto';
import { ExpencesService } from './expences.service';
import { Controller, Get, Param, Body, Post } from '@nestjs/common';

@Controller('expences')
export class ExpencesController {
  constructor(private ExpencesService: ExpencesService) {}
  @Get()
  getAllExpences() {
    return this.ExpencesService.getAllExpences();
  }
  @Get(':id')
  getExpenceById(@Param('id') id) {
    console.log(id, 'id');
    return this.ExpencesService.getExpenceById(Number(id));
  }
  @Post()
  createExpence(@Body() CreateExpenceDto: CreateExpenceDto) {
    const category = CreateExpenceDto?.category;
    const productName = CreateExpenceDto?.productName;
    const quantity = CreateExpenceDto?.quantity;
    const price = CreateExpenceDto?.price;
    return this.ExpencesService.createExpence({
      category,
      productName,
      quantity,
      price,
    });
  }
}
