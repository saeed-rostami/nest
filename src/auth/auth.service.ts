import {PrismaService} from './../prisma/prisma.service';
import {ForbiddenException, Injectable} from "@nestjs/common";
import {AuthDto} from "./dto";
import * as argon from "argon2";


@Injectable({})
export class AuthService {
    constructor(private prisma: PrismaService) {

    }

    async register(dto: AuthDto) {

        try {
            // hash password
            const hash = await argon.hash(dto.password);

            // create user
            const user = await this.prisma.user.create({
                data: {
                    email: dto.email,
                    hash
                }
            });

            delete user.hash;

            return user;

        } catch (error) {
           throw new ForbiddenException(
               error.messages
           )
        }
    }

    login() {
        return "Login";
    }


}