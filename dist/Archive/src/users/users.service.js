"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const create_user_dto_1 = require("./dto/create-user.dto");
const user_schema_1 = require("./schemas/user.schema");
const mongoose_2 = __importDefault(require("mongoose"));
const bcryptjs_1 = require("bcryptjs");
const customize_1 = require("../decorator/customize");
const api_query_params_1 = __importDefault(require("api-query-params"));
let UsersService = class UsersService {
    constructor(userModel) {
        this.userModel = userModel;
        this.getHashPassword = (password) => {
            const salt = (0, bcryptjs_1.genSaltSync)(10);
            const hash = (0, bcryptjs_1.hashSync)(password, salt);
            return hash;
        };
        this.updateUserToken = async (refreshToken, _id) => {
            return await this.userModel.updateOne({ _id }, {
                refreshToken
            });
        };
        this.findUserByToken = async (refreshToken) => {
            return await this.userModel.findOne({ refreshToken });
        };
    }
    async create(createUserDto, user) {
        const { name, email, password, age, gender, address, role, company } = createUserDto;
        const isExit = await this.userModel.findOne({ email });
        if (isExit) {
            throw new common_1.BadRequestException(`The email ${email} đã tồn tại trên hệ thống vui lòng sử dụng mail khác !`);
        }
        const hashPassword = this.getHashPassword(password);
        let userNew = await this.userModel.create({
            name, email, age, gender, address, role, company,
            password: hashPassword,
            createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return userNew;
    }
    async register(user) {
        const { name, email, password, age, gender, address } = user;
        const hashPassword = this.getHashPassword(password);
        const isExit = await this.userModel.findOne({ email });
        if (isExit) {
            throw new common_1.BadRequestException(`The email ${email} đã tồn tại trên hệ thống vui lòng sử dụng mail khác !`);
        }
        let newRegister = await this.userModel.create({
            name, email,
            password: hashPassword,
            age, gender, address,
            role: "USER"
        });
        return newRegister;
    }
    async update(updateUserDto, user) {
        const updated = await this.userModel.updateOne({ _id: updateUserDto._id }, Object.assign(Object.assign({}, updateUserDto), { updatedBy: {
                _id: user._id,
                email: user.email
            } }));
        return updated;
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.userModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.userModel.find(filter)
            .skip(offset)
            .limit(defaultLimit)
            .sort(sort)
            .populate(population)
            .exec();
        return {
            meta: {
                current: currentPage,
                pageSize: limit,
                pages: totalPages,
                total: totalItems
            },
            result
        };
    }
    findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return "Not Found";
        return this.userModel.findOne({
            _id: id
        });
    }
    findOneByUsername(username) {
        return this.userModel.findOne({
            email: username
        });
    }
    isValidPassword(password, hash) {
        return (0, bcryptjs_1.compareSync)(password, hash);
    }
    async remove(id, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return "Not Found";
        await this.userModel.deleteOne({
            _id: user._id,
            email: user.email
        });
        return this.userModel.softDelete({
            _id: id
        });
    }
};
__decorate([
    __param(1, (0, customize_1.User)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto, Object]),
    __metadata("design:returntype", Promise)
], UsersService.prototype, "create", null);
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __metadata("design:paramtypes", [Object])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map