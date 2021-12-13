import { IsNotEmpty, IsEmail, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class buyerDetailEditDTO {

    
    @IsNotEmpty()
    _id: string;

    company_code: string;

    type: string;

    category: string;

    legal_name: string;

    name: string;

    address: string;

    longitude: string;

    latitude: string;

    phone: string;

    whatsapp: string;

    email: string;

    website: string;

    instagram: string;

    facebook: string;

    twitter: string;
}

