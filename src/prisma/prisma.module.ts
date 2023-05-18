import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';


// @ts-ignore
@Global()
@Module({
  providers: [PrismaService],
  exports:  [PrismaService],
})
export class PrismaModule {}
