import { CreateUserDto, RegisterUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User as NewUser, UserDocument } from './schemas/user.schema';
import mongoose from 'mongoose';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { IUser } from './users.interface';
export declare class UsersService {
    private userModel;
    constructor(userModel: SoftDeleteModel<UserDocument>);
    getHashPassword: (password: string) => string;
    create(createUserDto: CreateUserDto, user: IUser): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>>;
    register(user: RegisterUserDto): Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>>;
    update(updateUserDto: UpdateUserDto, user: IUser): Promise<mongoose.UpdateWriteOpResult>;
    findAll(currentPage: number, limit: number, qs: string): Promise<{
        meta: {
            current: number;
            pageSize: number;
            pages: number;
            total: number;
        };
        result: Omit<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
            _id: mongoose.Types.ObjectId;
        }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
            _id: mongoose.Types.ObjectId;
        }, never> & Required<{
            _id: mongoose.Types.ObjectId;
        }>, never>, never>[];
    }>;
    findOne(id: string): "Not Found" | mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    findOneByUsername(username: string): mongoose.Query<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>, mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>>;
    isValidPassword(password: string, hash: string): boolean;
    remove(id: string, user: IUser): Promise<"Not Found" | {
        deleted: number;
    }>;
    updateUserToken: (refreshToken: string, _id: string) => Promise<mongoose.UpdateWriteOpResult>;
    findUserByToken: (refreshToken: string) => Promise<mongoose.Document<unknown, {}, mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never>> & Omit<mongoose.Document<unknown, {}, NewUser> & Omit<NewUser & {
        _id: mongoose.Types.ObjectId;
    }, never> & Required<{
        _id: mongoose.Types.ObjectId;
    }>, never>>;
}
