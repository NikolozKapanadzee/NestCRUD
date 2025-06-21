import { CreateUserDto } from './dto/create-user.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { UpdateUserDto } from './dto/update-user-dto';
import { UsersService } from './users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
} from '@nestjs/common';

@Controller('users')
export class UserController {
  constructor(private UsersService: UsersService) {}
  @Get()
  getAllUsers(@Query() query: QueryParamsDto) {
    const { page, take, gender } = query;
    console.log(page, take, gender, 'query');
    return this.UsersService.getAllUsers(query);
  }
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id) {
    console.log(id, 'id');
    return this.UsersService.getUserById(Number(id));
  }
  @Post()
  createUser(@Body() CreateUserDto: CreateUserDto) {
    const email = CreateUserDto?.email;
    const firstName = CreateUserDto?.firstName;
    const lastName = CreateUserDto?.lastName;
    const phoneNumber = CreateUserDto?.phoneNumber;
    const gender = CreateUserDto?.gender;

    return this.UsersService.createUser({
      email,
      firstName,
      lastName,
      phoneNumber,
      gender,
    });
  }
  @Delete(':id')
  deleteUserById(@Param('id', ParseIntPipe) id) {
    return this.UsersService.deleteUserById(Number(id));
  }
  @Put(':id')
  updateUserById(
    @Param('id', ParseIntPipe) id,
    @Body() UpdateUserDto: UpdateUserDto,
  ) {
    return this.UsersService.updateUserById(Number(id), UpdateUserDto);
  }
}
