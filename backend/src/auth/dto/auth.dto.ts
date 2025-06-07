import { IsEmail, IsNotEmpty, isString, IsString } from "class-validator"

export class AuthDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    f_name: string

    @IsString()
    @IsNotEmpty()
    l_name: string

    @IsString()
    @IsNotEmpty()
    password: string
}