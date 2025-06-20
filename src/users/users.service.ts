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
    { id: 1, name: 'user1', email: 'user1@gmail.com' },
    { id: 2, name: 'user2', email: 'user2@gmail.com' },
  ];
  getAllUsers() {
    return this.users;
  }
  getUserById(id: Number) {
    const user = this.users.find((el) => el.id === id);
    return user;
  }
  createUser({ email, name }: CreateUserDto) {
    if (!email || !name) {
      throw new HttpException(
        'name and email is required',
        HttpStatus.BAD_REQUEST,
      );
    }
    const lastId = this.users[this.users.length - 1]?.id || 0;
    const newUser = {
      id: lastId + 1,
      name,
      email,
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
    if (UpdateUserDto.name) {
      updateReq.name = UpdateUserDto.name;
    }
    this.users[index] = {
      ...this.users[index],
      ...updateReq,
    };
    return 'updated succesfully';
  }
}
