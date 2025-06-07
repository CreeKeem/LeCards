import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignUpDto {
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