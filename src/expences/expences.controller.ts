import { CreateExpenceDto } from './dto/create-expence-dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdateExpenceDto } from './dto/update-expence-dto';
import { ExpencesService } from './expences.service';

import {
  Controller,
  Get,
  Param,
  Body,
  Post,
  Delete,
  Put,
  ParseIntPipe,
  Query,
} from '@nestjs/common';

@Controller('expences')
export class ExpencesController {
  constructor(private ExpencesService: ExpencesService) {}
  @Get()
  getAllExpences(@Query() query: QueryParamsDto) {
    const { page, take, category } = query;
    console.log(page, take, category, 'query');
    return this.ExpencesService.getAllExpences(query);
  }
  @Get(':id')
  getExpenceById(@Param('id', ParseIntPipe) id) {
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
  @Delete(':id')
  deleteExpenceById(@Param('id', ParseIntPipe) id) {
    return this.ExpencesService.deleteUserById(Number(id));
  }
  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id,
    @Body() UpdateExpenceDto: UpdateExpenceDto,
  ) {
    return this.ExpencesService.updateUserById(Number(id), UpdateExpenceDto);
  }
}
