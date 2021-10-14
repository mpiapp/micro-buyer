import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document, Types } from "mongoose";
import * as mongoose from 'mongoose';

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class User {
    _id: string;
    
    @Prop({unique: true, index: true})
    auth_id: string;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Company'})
    company_id: Types.ObjectId;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role'})
    role_id: Types.ObjectId;

    @Prop()
    fullname: string;

    @Prop({unique: true, index: true})
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;