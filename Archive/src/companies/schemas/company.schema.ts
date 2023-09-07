import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose,{ HydratedDocument, Types } from 'mongoose';

export type CompanyDocument = HydratedDocument<Company>;

@Schema({timestamps: true})
export class Company {
  @Prop({type: String ,required: false})
  name: string;

  @Prop({type: String ,required: false})
  address: string;

  @Prop({type: String ,required: false})
  description: string;

  @Prop({ type: Types.ObjectId})
  createdBy: {
    _id :mongoose.Schema.Types.ObjectId;
    email: string;
  }
  @Prop({ type: Types.ObjectId})
  updatedBy: {
    _id :mongoose.Schema.Types.ObjectId;
    email: string;
  }
  @Prop({ type: Types.ObjectId})
  deletedBy: {
    _id :mongoose.Schema.Types.ObjectId;
    email: string;
  }


  
  @Prop()
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;

  @Prop()
  createAt: Date;

  @Prop()
  updatedAt: Date;
}

export const CompanySchema = SchemaFactory.createForClass(Company);