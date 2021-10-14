import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class Role {
    _id: string;

    @Prop({ unique: true, index: true })
    name: string;

    @Prop()
    permission: string[];
}

export const RoleSchema = SchemaFactory.createForClass(Role);
export type RoleDocument = Role & Document;