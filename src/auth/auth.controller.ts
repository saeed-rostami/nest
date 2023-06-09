import {AuthService} from './auth.service';
import {Body, Controller, Get, Post, Req} from "@nestjs/common";
import {Request} from "express";
import {AuthDto} from "./dto";


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {
    }

    @Post("signup")
    signUp(@Body() dto: AuthDto) {
        console.log({dto})
        return this.authService.register(dto);

    }

    @Post("signin")

    signIn(@Body() dto: AuthDto) {
        return this.authService.login(dto);
    }


}