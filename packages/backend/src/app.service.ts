import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { QueryGetUserDto } from './dto/user.dto';
import { users } from './consts/users';

const DELAY = 5000

@Injectable()
export class AppService {
  async getUser(query: QueryGetUserDto) {
    const user = users.find((user) => query.email === user.email && (!query.number || query.number === user.number));

    await new Promise(res => setTimeout(res, DELAY));

    if (!user) {
      throw new HttpException('Not found', HttpStatus.NOT_FOUND);
    }

    return user;
  }
}
