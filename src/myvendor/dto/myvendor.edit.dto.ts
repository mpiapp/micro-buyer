import { ApiProperty } from "@nestjs/swagger"

export class MyvendorEditDTO {
    @ApiProperty()
    company_id: string;

    @ApiProperty()
    vendor_id: string;

    @ApiProperty()
    payment_term: string;

    @ApiProperty()
    initial_discount: number;


    @ApiProperty()
    status: string;
}