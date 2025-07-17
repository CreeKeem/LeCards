import { IsEmail, IsNotEmpty, IsString } from "class-validator"

export class SignUpDto {
    @IsEmail()
    @IsNotEmpty()
    email: string

    @IsString()
    @IsNotEmpty()
    fName: string

    @IsString()
    @IsNotEmpty()
    lName: string

    @IsString()
    @IsNotEmpty()
    password: string
}