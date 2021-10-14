import { IsNotEmpty, IsEmail, IsNumber, IsOptional } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class companyDetailEditDTO {
    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    type: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsNumber()
    category: number;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    legal_name: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    alias_name: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    longitude: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    latitude: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsOptional()
    whatsapp: string;

    @ApiProperty()
    @IsOptional()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsOptional()
    website: string;

    @ApiProperty()
    @IsOptional()
    instagram: string;

    @ApiProperty()
    @IsOptional()
    facebook: string;

    @ApiProperty()
    @IsOptional()
    twitter: string;
}

