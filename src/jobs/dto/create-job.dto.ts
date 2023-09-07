import { Transform, Type } from 'class-transformer';
import { IsArray, IsBoolean, IsDate, IsEmail, IsNotEmpty, IsNotEmptyObject, IsObject, IsString, MaxLength, MinLength, ValidateNested, isNotEmpty } from 'class-validator';
import mongoose from 'mongoose';
class Company {
    @IsNotEmpty()
    _id: mongoose.Schema.Types.ObjectId;
  
    @IsNotEmpty()
    name: string;
  }

export class CreateJobDto {
    name: string;
    @IsNotEmpty({message : 'Name không được để trống',})
   
    @IsArray()
    @IsNotEmpty({message : 'Skills không được để trống',})
    skills: string[];


    @IsNotEmptyObject()
    @IsObject()
    @ValidateNested()
    @Type(() => Company)
    company: Company;




    @IsNotEmpty({message: 'Salary không được để trống',})
    salary: number;

    @IsNotEmpty({message: 'Quantity không được để trống',})
    quantity: number

    @IsNotEmpty({message: 'Level không được để trống',})
    level: string;

    @IsNotEmpty({message: 'Description không được để trống',})
    description: string;

    @IsNotEmpty({message: 'Ngày bắt đầu không được để trống',})
    @Transform(({value}) => new Date(value))
    @IsDate({message: 'Là dạng dâte'})
    startDate: Date;

    @IsNotEmpty({message: 'Ngày kết thúc không được để trống',})
    @Transform(({value}) => new Date(value))
    @IsDate({message: 'Là dạng dâte'})
    endDate: Date;

    @IsNotEmpty({message: 'isActive không được để trống',})
    @IsBoolean({message: 'isBolean không đúng định dạng bolean',})
    isActive:boolean;
  

    
}

