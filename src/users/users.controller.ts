import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ResponseMessage, User } from 'src/decorator/customize';
import { IUser } from './users.interface';


@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post() 
  @ResponseMessage("Create a new User")
  async create(@Body() createUserDto : CreateUserDto, @User() user:IUser){
    let newUser = await this.usersService.create(createUserDto,user)
    return {
      _id : newUser?._id,
      createdAt: newUser?.createdAt
    } 
  }

  @Get()
  @ResponseMessage("Feach user with paginate")
  findAll(
    @Query("current") currentPage: string,
    @Query("pageSize") limit: string,
    @Query() qs: string,
  ) {
    return this.usersService.findAll(+currentPage,+limit,qs);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    
    return this.usersService.findOne(id);
  }
  
  @ResponseMessage("Update a User")
  @Patch()
  async update(@Body() updateUserDto: UpdateUserDto,@User() user:IUser) {
    let updatedUser=await this.usersService.update(updateUserDto,user)
    return updatedUser;
  }
  @ResponseMessage("Delete a User")
  @Delete(':id')
  remove(@Param('id') id: string,@User() user:IUser) {
    return this.usersService.remove(id,user);
  }
}
