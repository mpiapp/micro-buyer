import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class Address {
    _id: string;
    
    @Prop()
    buyer_id: string;

    @Prop()
    address: string;

    @Prop()
    phone: string;

    @Prop()
    longitude: string;

    @Prop()
    latitude: string;
    
    @Prop({default: false})
    isDeleted: boolean;

    @Prop({default: null})
    deletedAt: Date;
}

export const AddressSchema = SchemaFactory.createForClass(Address);
export type AddressDocument = Address & Document;