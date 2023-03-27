import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { env } from 'process';

@Injectable()
export class PrismaService extends PrismaClient {
    constructor() {
        super({
           datasources : {
            db: {
                url : "postgresql://postgres:12345@localhost:5432/nest?schema=public"
            }
           }
        })
    }
}
