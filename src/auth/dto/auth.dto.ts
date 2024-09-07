import { IsNotEmpty,IsString } from "class-validator";

export class AuthDto {
    @IsNotEmpty()
    @IsString()
    readonly username: string;
    
    @IsNotEmpty()
    readonly password: string;

}