import { IsNotEmpty, IsOptional } from "class-validator";

export class CreateDto{
    @IsNotEmpty()
    readonly text : string;
    readonly date : Date;
    @IsNotEmpty()
    readonly price : number;
    @IsOptional()
    readonly userId : string;

}