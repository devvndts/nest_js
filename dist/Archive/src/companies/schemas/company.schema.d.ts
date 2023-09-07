import mongoose, { HydratedDocument, Types } from 'mongoose';
export type CompanyDocument = HydratedDocument<Company>;
export declare class Company {
    name: string;
    address: string;
    description: string;
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
    updatedAt: Date;
}
export declare const CompanySchema: mongoose.Schema<Company, mongoose.Model<Company, any, any, any, mongoose.Document<unknown, any, Company> & Omit<Company & {
    _id: Types.ObjectId;
}, never>, any>, {}, {}, {}, {}, mongoose.DefaultSchemaOptions, Company, mongoose.Document<unknown, {}, mongoose.FlatRecord<Company>> & Omit<mongoose.FlatRecord<Company> & {
    _id: Types.ObjectId;
}, never>>;
