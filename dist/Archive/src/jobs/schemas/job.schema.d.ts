import mongoose, { HydratedDocument } from 'mongoose';
export type JobDocument = HydratedDocument<Job>;
export declare class Job {
    name: string;
    skills: string[];
    company: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    salary: number;
    quantity: number;
    level: string;
    description: string;
    startDate: Date;
    endDate: Date;
    isActive: Boolean;
    createdBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    updatedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    deletedBy: {
        _id: mongoose.Schema.Types.ObjectId;
        email: string;
    };
    isDeleted: boolean;
    deletedAt: Date;
    createAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const JobSchema: mongoose.Schema<Job, mongoose.Model<Job, any, any, any, mongoose.Document<unknown, any, Job> & Omit<Job & {
    _id: mongoose.Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Job, mongoose.Document<unknown, {}, mongoose.FlatRecord<Job>> & Omit<mongoose.FlatRecord<Job> & {
    _id: mongoose.Types.ObjectId;
}, never>>;
