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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateJobDto = void 0;
const class_transformer_1 = require("class-transformer");
const class_validator_1 = require("class-validator");
const mongoose_1 = __importDefault(require("mongoose"));
class Company {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", mongoose_1.default.Schema.Types.ObjectId)
], Company.prototype, "_id", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], Company.prototype, "ar", void 0);
class CreateJobDto {
}
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Name không được để trống', }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsNotEmpty)({ message: 'Skills không được để trống', }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "skills", void 0);
__decorate([
    (0, class_validator_1.IsNotEmptyObject)(),
    (0, class_validator_1.IsObject)(),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => Company),
    __metadata("design:type", String)
], CreateJobDto.prototype, "company", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Salary không được để trống', }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "salary", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Quantity không được để trống', }),
    __metadata("design:type", Number)
], CreateJobDto.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Level không được để trống', }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "level", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({ message: 'Description không được để trống', }),
    __metadata("design:type", String)
], CreateJobDto.prototype, "description", void 0);
exports.CreateJobDto = CreateJobDto;
//# sourceMappingURL=create-job.dto.js.map