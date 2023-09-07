import {  IsNotEmpty, IsString } from 'class-validator';
export class CreateCompanyDto {
    @IsNotEmpty({message: "Name không để trống "})
    name: string;

    @IsNotEmpty({message: "Address không để trống "})
    address: string;
 
    @IsNotEmpty({message: "Description không để trống "})
    description: string;

}
