import { Type } from 'class-transformer';
import { IsArray, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested } from 'class-validator';
import mongoose from 'mongoose';
class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;
  
    @IsNotEmpty()
    ar: string;
  }

export class CreateJobDto {
    name: string;
    @IsNotEmpty({message : 'Name không được để trống',})
   
    @IsArray()
    @IsNotEmpty({message : 'Skills không được để trống',})
    skills: string;


    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: string;




    @IsNotEmpty({message: 'Salary không được để trống',})
    salary: number;

    @IsNotEmpty({message: 'Quantity không được để trống',})
    quantity: number

    @IsNotEmpty({message: 'Level không được để trống',})
    level: string;

    @IsNotEmpty({message: 'Description không được để trống',})
    description: string;

   

    role: string;

    
}

