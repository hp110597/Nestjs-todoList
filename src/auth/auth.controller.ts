import { BadRequestException, Controller, HttpException, HttpStatus, NotFoundException } from '@nestjs/common';
import { Body, Get, Headers, Param, Post, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common/decorators';
import { Req } from '@nestjs/common/decorators/http/route-params.decorator';
import { JwtService } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { AuthService } from './auth.service';
import { NguoiDungDto, UploadDto } from './dto';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService,
        private jwt: JwtService
    ){}

    //login
     @UseGuards(AuthGuard("jwt"))   
     @Get()
     demo(@Req() req:Request, @Headers("tokenLogin") token:string):string{
        console.log(req.user)
        if(this.jwt.verify(token))
        return 'demo jwt'
     }   

    @Post("login")
    async login(@Body() body:NguoiDungDto):Promise<string>{
      
        const {email,mat_khau}=body
        let checkLogin = await this.authService.login(email,mat_khau)
      
            if(checkLogin.check){
                //jwt: trả về token user
                return checkLogin.data
            }else{
                throw new HttpException(checkLogin.data,HttpStatus.NOT_FOUND)
                // throw new NotFoundException("Mật khẩu hoặc email không đúng")
            }
    }

    //signup
    @Post("signup")
    signup(@Req() req:Request):string{
        console.log(req.user)
        return "signup"
    }

    @UseInterceptors(FileInterceptor("avatar",{
        storage:diskStorage({
            destination:"./public/img",
            filename(req,file,callback){
                let date = new Date()
                callback(null,`${date.getTime()}-${file.originalname}`)
            }
        })
    }))
    @Post("upload/:id")
    upload(@Param("id") id:string, @UploadedFile() file:UploadDto):Promise<boolean>{
        return this.authService.uploadAvatar(Number(id),file.filename)
    }

}
