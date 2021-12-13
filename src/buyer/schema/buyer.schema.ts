import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { Document } from "mongoose";
import { VerificationStatus } from "../buyer.enum";

@Schema({versionKey: false, strict: "throw",  timestamps: true})
export class Buyer {
    _id: string;
    
    @Prop()
    name: string;

    @Prop()
    type: string;

    @Prop()
    category: string;

    @Prop({unique: true, index: true})
    legal_name: string;

    @Prop({unique: true, index: true})
    company_code: string;

    @Prop()
    address: string;

    @Prop()
    longitude: string;

    @Prop()
    latitude: string;

    @Prop()
    phone: string;

    @Prop()
    whatsapp: string;

    @Prop({unique: true, index: true})
    email: string;

    @Prop()
    website: string;

    @Prop()
    instagram: string;

    @Prop()
    facebook: string;

    @Prop()
    twitter: string;

    @Prop()
    legal_docs: [];
    
    @Prop({default: VerificationStatus.UNVERIFIED})
    verification_status: string;

    @Prop({default: false})
    isDeleted: boolean;

    @Prop({default: null})
    deletedAt: Date;
}

export const BuyerSchema = SchemaFactory.createForClass(Buyer);
export type BuyerDocument = Buyer & Document;