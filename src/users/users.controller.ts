import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Req,
  Res,
  Header,
  ParseIntPipe,
  HttpStatus,
  ValidationPipe,
  UseInterceptors,
  InternalServerErrorException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Request, Response } from 'express';
import { AppendPrefixPipe } from 'src/pipes/append-prefix.pipe';
import { CreateUserRequestValidator } from 'src/pipes/create-user-dto-validation.pipe';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { ErrorsInterceptor } from 'src/interceptors/error.interceptor';

// @UseInterceptors(LoggingInterceptor)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @Post()
  // create(@Body(CreateUserRequestValidator) createUserDto: CreateUserDto) {
  //   return this.usersService.create(createUserDto);
  // }

  // @Get()
  // findAll(@Req() req: Request, @Res() res: Response) {
  //   return res.set('WhoIAm', 'Sagchual CHA').json({ hello: 'world' });
  // }

  @Header('WhoIAm', 'Sagchual CHA')
  @UseInterceptors(LoggingInterceptor)
  @Get()
  findAll() {
    console.log('it will load all users');
    return this.usersService.findAll();
  }

  @UseInterceptors(ErrorsInterceptor)
  @Get(':id')
  findOne(
    @Param('id', new AppendPrefixPipe('XXX_'))
    id: string,
  ) {
    return this.usersService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
