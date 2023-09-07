import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';
import { IUser } from 'src/users/users.interface';
import { Job, JobDocument } from './schemas/job.schema';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import mongoose from 'mongoose';
export declare class JobsService {
    private jobModel;
    constructor(jobModel: SoftDeleteModel<JobDocument>);
    create(createJobDto: CreateJobDto, user: IUser): Promise<{
        _id: any;
        createdAt: Date;
    }>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Omit<Job & {
            _id: mongoose.Types.ObjectId;
        }, never>> & Omit<mongoose.Document<unknown, {}, Job> & Omit<Job & {
            _id: mongoose.Types.ObjectId;
        }, never> & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>, never>[];
    }>;
    findOne(id: string): Promise<"Not Found" | (mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, Job> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, Job> & Omit<Job & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>)>;
    update(id: string, updateJobDto: UpdateJobDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    remove(id: string, user: IUser): Promise<"Not Found" | {
        deleted: number;
    }>;
}
