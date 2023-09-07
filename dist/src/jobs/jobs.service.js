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
exports.JobsService = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const common_1 = require("@nestjs/common");
const job_schema_1 = require("./schemas/job.schema");
const api_query_params_1 = __importDefault(require("api-query-params"));
const mongoose_2 = __importDefault(require("mongoose"));
let JobsService = class JobsService {
    constructor(jobModel) {
        this.jobModel = jobModel;
    }
    async create(createJobDto, user) {
        const { name, skills, company, salary, quantity, level, description, startDate, endDate, isActive } = createJobDto;
        let newJob = await this.jobModel.create({
            name, skills, company, salary, quantity, level, description, startDate, endDate, isActive, createdBy: {
                _id: user._id,
                email: user.email
            }
        });
        return {
            _id: newJob === null || newJob === void 0 ? void 0 : newJob.id,
            createdAt: newJob === null || newJob === void 0 ? void 0 : newJob.createdAt
        };
    }
    async findAll(currentPage, limit, qs) {
        const { filter, sort, population } = (0, api_query_params_1.default)(qs);
        delete filter.current;
        delete filter.pageSize;
        let offset = (+currentPage - 1) * (+limit);
        let defaultLimit = +limit ? +limit : 10;
        const totalItems = (await this.jobModel.find(filter)).length;
        const totalPages = Math.ceil(totalItems / defaultLimit);
        const result = await this.jobModel.find(filter)
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
    async findOne(id) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return "Not Found";
        return this.jobModel.findOne({
            _id: id
        });
    }
    async update(id, updateJobDto, user) {
        return await this.jobModel.updateOne({
            _id: id
        }, Object.assign(Object.assign({}, updateJobDto), { updatedBy: {
                _id: user._id,
                email: user.email
            } }));
    }
    async remove(id, user) {
        if (!mongoose_2.default.Types.ObjectId.isValid(id))
            return "Not Found";
        await this.jobModel.deleteOne({
            _id: user._id,
            email: user.email
        });
        return this.jobModel.softDelete({
            _id: id
        });
    }
};
JobsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(job_schema_1.Job.name)),
    __metadata("design:paramtypes", [Object])
], JobsService);
exports.JobsService = JobsService;
//# sourceMappingURL=jobs.service.js.map