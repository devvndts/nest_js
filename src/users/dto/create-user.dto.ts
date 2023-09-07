import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;
  
    @IsNotEmpty()
    ar: string;
  }

export class CreateUserDto {
    name: string;
    @IsNotEmpty({message : 'Name không được để trống',})
   
    @IsEmail({},{message: 'Email không đúng định dạng',})
    @IsNotEmpty({message : 'Email không được để trống',})
    email: string;

    @IsNotEmpty({message: 'Password không được để trống',})
    password: string;

    @IsNotEmpty({message: 'Age không được để trống',})
    age: number

    @IsNotEmpty({message: 'Gender không được để trống',})
    gender: string;

    @IsNotEmpty({message: 'Address không được để trống',})
    address: string;

    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: string;

    role: string;

    
}


export class RegisterUserDto {
    name: string;
    @IsNotEmpty({message : 'Name không được để trống',})
   
    @IsEmail({},{message: 'Email không đúng định dạng',})
    @IsNotEmpty({message : 'Email không được để trống',})
    email: string;

    @IsNotEmpty({message: 'Password không được để trống',})
    password: string;

    @IsNotEmpty({message: 'Age không được để trống',})
    age: number

    @IsNotEmpty({message: 'Gender không được để trống',})
    gender: string;

    @IsNotEmpty({message: 'Address không được để trống',})
    address: string;
}
