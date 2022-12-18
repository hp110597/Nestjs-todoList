import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client'
import { User } from './dto';


@Injectable()
export class AppService {

  prisma: PrismaClient = new PrismaClient();
  getHello(): string {
    return 'Hello World!';
  }

  getSum(soMot: number, soHai: number): number {
    return soMot + soHai;
  }

  // async getUser(): Promise<User[]> {
  //   let data = await this.prisma.user.findMany();

  //   return data
  // }
}
