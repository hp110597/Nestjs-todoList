import { Injectable } from '@nestjs/common';
import {PrismaClient} from '@prisma/client'
@Injectable()
export class AuthService {

    prisma: PrismaClient = new PrismaClient()
    
    async login(email:string,mat_khau:string):Promise<any>{

        let checkEmail = await this.prisma.nguoi_dung.findFirst({
            where:{
                email
            }
        })
        if(checkEmail){
            if(checkEmail.mat_khau==mat_khau){
                //pass đúng
                return true
            }else{
                //pass sai
                return false
            }
        }else{
            //email sai
            return true
        }
    }

}
