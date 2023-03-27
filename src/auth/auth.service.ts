import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from "@nestjs/common";


@Injectable({})
export class AuthService{
    constructor(private prisma: PrismaService) {

    }

    login() {
        return "lOGIN";
    }

    register() {
        return "REgister";
        
    }
}