import { UpdateUserDto } from './dto/update-user-dto';
import { CreateUserDto } from './dto/create-user.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UsersService {
  private users = [
    {
      id: 1,
      firstName: 'user1',
      lastName: 'useradze',
      email: 'user1@gmail.com',
      phoneNumber: 555111922,
      gender: 'male',
    },
    {
      id: 2,
      firstName: 'user2',
      lastName: 'useradze2',
      email: 'user2@gmail.com',
      phoneNumber: 555910282,
      gender: 'female',
    },
  ];
  getAllUsers() {
    return this.users;
  }
  getUserById(id: Number) {
    const user = this.users.find((el) => el.id === id);
    return user;
  }
  createUser({
    firstName,
    lastName,
    email,
    phoneNumber,
    gender,
  }: CreateUserDto) {
    if (!firstName || !lastName || !email || !phoneNumber || !gender) {
      throw new HttpException(
        'all fields are required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      firstName,
      lastName,
      email,
      phoneNumber,
      gender,
    };
    this.users.push(newUser);
    return 'created succesfully';
  }
  deleteUserById(id: number) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found');
    }
    this.users.splice(index, 1);
    return 'deleted succesfully';
  }
  updateUserById(id: number, UpdateUserDto: UpdateUserDto) {
    const index = this.users.findIndex((el) => el.id === id);
    if (index === -1) {
      throw new NotFoundException('user not found');
    }
    const updateReq: UpdateUserDto = {};
    if (UpdateUserDto.email) {
      updateReq.email = UpdateUserDto.email;
    }
    if (UpdateUserDto.firstName) {
      updateReq.firstName = UpdateUserDto.firstName;
    }
    if (UpdateUserDto.lastName) {
      updateReq.lastName = UpdateUserDto.lastName;
    }
    if (UpdateUserDto.phoneNumber) {
      updateReq.phoneNumber = UpdateUserDto.phoneNumber;
    }
    if (UpdateUserDto.gender) {
      updateReq.gender = UpdateUserDto.gender;
    }
    this.users[index] = {
      ...this.users[index],
      ...updateReq,
    };
    return 'updated succesfully';
  }
}
