import { IsNotEmpty } from 'class-validator';

export class buyerRegisterDTO {
    @IsNotEmpty()
    name: string;
    
    company_code: string;
}

