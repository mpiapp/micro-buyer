import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose";
import * as mongoose from 'mongoose';

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class Myvendor {
    _id: string;
    
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company'})
    company_id: Types.ObjectId;

    @Prop({unique: true, index: true})
    vendor_id: string;

    @Prop()
    payment_term: string;

    @Prop()
    initial_discount: number;
    
    @Prop({default: null})
    status: string;

    @Prop({default: false})
    isDeleted: boolean;

    @Prop({default: null})
    deletedAt: Date;
}

export const MyvendorSchema = SchemaFactory.createForClass(Myvendor);
export type MyvendorDocument = Myvendor & Document;