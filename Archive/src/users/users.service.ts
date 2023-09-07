import { InjectModel } from '@nestjs/mongoose';
import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as NewUser, UserDocument } from './schemas/user.schema';
import mongoose, { Model } from 'mongoose';
import { compare, compareSync, genSaltSync , hashSync } from 'bcryptjs';
import {SoftDeleteModel} from 'soft-delete-plugin-mongoose'
import { IUser } from './users.interface';
import {User} from '../decorator/customize';
import aqp from 'api-query-params';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(NewUser.name) 
    private userModel: SoftDeleteModel<UserDocument>) {}
    getHashPassword=(password: string)=>{
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }
  async create(createUserDto: CreateUserDto,@User() user: IUser) {
    const {name,email,password,age,gender,address,role,company} =createUserDto;
    const isExit = await this.userModel.findOne({email});
    if(isExit){
      throw new BadRequestException(`The email ${email} đã tồn tại trên hệ thống vui lòng sử dụng mail khác !`)
    }
  const hashPassword=this.getHashPassword(password);
  
  let userNew= await this.userModel.create({
    name, email,age,gender,address,role,company,
    password:hashPassword,
    createdBy:{
      _id : user._id,
      email: user.email
    }
    })
    return userNew;
  }


  async register(user:RegisterUserDto){
    const {name,email,password,age,gender,address} = user;
    const hashPassword=this.getHashPassword(password);

    const isExit = await this.userModel.findOne({email});
    if(isExit){
      throw new BadRequestException(`The email ${email} đã tồn tại trên hệ thống vui lòng sử dụng mail khác !`)
    }

    let newRegister= await this.userModel.create({
      name,email,
      password:hashPassword,
      age,gender,address,
      role:"USER"
    })
    return newRegister;

  }


  async update(updateUserDto: UpdateUserDto,user: IUser){
    const updated= await this.userModel.updateOne(
      {_id:updateUserDto._id},{
        ...updateUserDto,
        updatedBy: {
          _id:user._id,
          email:user.email
        }  
      }
      
    )
    return updated
  }

  async findAll(currentPage: number,limit:number, qs: string) {
    const {filter,sort,population} = aqp(qs);
    delete filter.current;
    delete filter.pageSize;

    let offset=(+currentPage - 1) * (+limit);
    let defaultLimit = +limit ? + limit : 10;

    const totalItems=(await this.userModel.find(filter)).length;
    const totalPages=Math.ceil(totalItems/defaultLimit);

    const result = await this.userModel.find(filter)
    .skip(offset)
    .limit(defaultLimit)
    .sort(sort as any) 
    .populate(population)
    .exec();
    return {
      meta: {
      current: currentPage, //trang hiện tại
      pageSize: limit, //số lượng bản ghi đã lấy
      pages: totalPages, //tổng số trang với điều kiện query
      total: totalItems // tổng số phần tử (số bản ghi)
      },
      result //kết quả query
      }
  }

  findOne(id: string) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return "Not Found";

    return this.userModel.findOne({
      _id : id
    })
  }

  findOneByUsername(username: string) {

    return this.userModel.findOne({
      email : username
    })
  }

  isValidPassword(password:string ,hash:string){
    return  compareSync(password,hash);
  }



  async remove(id: string,user: IUser) {
    if(!mongoose.Types.ObjectId.isValid(id))
      return "Not Found";
    
    await this.userModel.deleteOne({
      _id : user._id,
      email: user.email
    })
    return this.userModel.softDelete({
      _id: id
    })
  }

    updateUserToken = async (refreshToken: string,_id:string)=>{
      return  await this.userModel.updateOne(
        {_id},{
          refreshToken
        }
        
      )
    }

    findUserByToken=async (refreshToken: string)=>{
      return await this.userModel.findOne({refreshToken})
    }
}
