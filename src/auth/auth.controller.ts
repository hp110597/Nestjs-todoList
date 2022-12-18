import { BadRequestException, Controller, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Body, Post } from '@nestjs/common/decorators';
import { AuthService } from './auth.service';
import { NguoiDung } from './dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ){}

    //login
    @Post("login")
    async login(@Body() body:NguoiDung):Promise<string>{
      
        const {email,mat_khau}=body
        let checkLogin = await this.authService.login(email,mat_khau)
      
            if(checkLogin){
                //jwt: trả về token user
                return 'login thành công'
            }else{
                // throw new HttpException("Mật khẩu hoặc email không đúng",HttpStatus.NOT_FOUND)
                throw new NotFoundException("Mật khẩu hoặc email không đúng")
            }
 
    }

    //signup
    @Post("signup")
    signup():string{
        return "signup"
    }

}
