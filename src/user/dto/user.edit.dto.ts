import { IsNotEmpty, IsEmail } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class UserEditDTO {
    @ApiProperty()
    @IsEmail()
    @IsNotEmpty()
    email: string;
    
    @ApiProperty()
    @IsNotEmpty()
    role_id: string;

    @ApiProperty()
    @IsNotEmpty()
    fullname: string;

    @ApiProperty()
    @IsNotEmpty()
    password: string;
}

