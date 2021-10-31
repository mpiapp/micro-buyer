import { ApiProperty } from "@nestjs/swagger"

export class MyvendorDeleteDTO {
    @ApiProperty()
    company_id: string;

    @ApiProperty()
    vendor_id: string; 
    
    isDeleted: boolean;

    deletedAt: Date;
}