import {IsEmail, isEmail, IsNotEmpty, isNotEmpty, IsString, isString} from "class-validator";

export class AuthDto {

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}
