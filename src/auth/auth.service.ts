import {PrismaService} from './../prisma/prisma.service';
import {ForbiddenException, Injectable} from "@nestjs/common";
import {AuthDto} from "./dto";
import * as argon from "argon2";
import {JwtService} from "@nestjs/jwt";
import {ConfigService} from "@nestjs/config";


@Injectable({})
export class AuthService {
    constructor(
        private config: ConfigService,
        private prisma: PrismaService,
        private jwt: JwtService
    ) {
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

            return this.signInToken(user.id, user.email);


        } catch (error) {
            throw new ForbiddenException(
                error.messages
            )
        }
    }

    async login(dto: AuthDto) {

        // find user
        const user = await this.prisma.user.findUnique({
            where: {
                email: dto.email
            }
        });

        if (!user) {
            throw new ForbiddenException("User not found");
        }

        // check password matches
        const passwordMatch = await argon.verify(user.hash, dto.password);

        if (!passwordMatch) {
            throw new ForbiddenException("Password is incorrect");
        }


        return this.signInToken(user.id, user.email);
    }

   async signInToken(userId: number, email: string) {

        try {
            const payload = {
                sub: userId,
                email
            };

            const secret = this.config.get("JWT_SECRET")

            const token = await this.jwt.signAsync(payload, {
                expiresIn: "15m",
                secret: secret
            });

            return {
                access_token : token
            };

        } catch (error) {
            throw new ForbiddenException(error.messages)
        }
    }

}