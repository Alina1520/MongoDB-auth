import { IsNotEmpty,IsString } from "class-validator";

export class RefreshDto {
    @IsNotEmpty()
    readonly username: string;
    
    @IsNotEmpty()
    readonly refresh_token: string;

}