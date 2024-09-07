import { IsNotEmpty, IsOptional } from "class-validator";

export class UpdateDto{
    @IsNotEmpty()
    readonly text : string;
    readonly date : Date;
    @IsNotEmpty()
    readonly price : number;
}