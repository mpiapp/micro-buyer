import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class buyerDetailAddDTO {

    @ApiProperty()
    type: string;

    @ApiProperty()
    category: string;

    @IsNotEmpty()
    @ApiProperty()
    legal_name: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    address: string;

    @ApiProperty()
    longitude: string;

    @ApiProperty()
    latitude: string;

    @ApiProperty()
    phone: string;

    @ApiProperty()
    whatsapp: string;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    website: string;

    @ApiProperty()
    instagram: string;

    @ApiProperty()
    facebook: string;

    @ApiProperty()
    twitter: string;
}

