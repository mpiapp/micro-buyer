import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from "@nestjs/swagger";

export class RoleEditDTO {
    @ApiProperty()
    @IsNotEmpty()
    name: string;

    @ApiProperty()
    @IsNotEmpty()
    permission: any;
}

