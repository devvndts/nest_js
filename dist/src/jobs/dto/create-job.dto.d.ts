import mongoose from 'mongoose';
declare class Company {
    _id: mongoose.Schema.Types.ObjectId;
    name: string;
}
export declare class CreateJobDto {
    name: string;
    skills: string[];
    company: Company;
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: boolean;
}
export {};
