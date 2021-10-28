import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class addressAddDTO {
    @ApiProperty()
    @IsNotEmpty()
    buyer_id: string;

    @ApiProperty()
    @IsNotEmpty()
    address: string;

    @ApiProperty()
    @IsNotEmpty()
    phone: string;

    @ApiProperty()
    @IsNotEmpty()
    longitude: string;

    @ApiProperty()
    @IsNotEmpty()
    latitude: string;
}