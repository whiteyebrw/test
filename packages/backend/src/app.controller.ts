import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { QueryGetUserDto } from './dto/user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/user')
  getUser(@Query() query: QueryGetUserDto) {
    return this.appService.getUser(query);
  }
}
