import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaClient } from '@prisma/client';
@Injectable()
export class AuthService {
  constructor(private jwt: JwtService, private config: ConfigService) {}

  private prisma: PrismaClient = new PrismaClient();

  async login(email: string, mat_khau: string): Promise<any> {
    let checkEmail = await this.prisma.nguoi_dung.findFirst({
      where: {
        email,
      },
    });
    if (checkEmail) {
      if (checkEmail.mat_khau == mat_khau) {
        let token = this.jwt.sign(checkEmail, {
          expiresIn: '2d',
          secret: this.config.get('SECRET_KEY'),
        });
        //pass đúng
        return {
          check: true,
          data: token,
        };
      } else {
        //pass sai
        return {
          check: false,
          data: 'Mật khẩu sai',
        };
      }
    } else {
      //email sai
      return {
        check: false,
        data: 'Email sai',
      };
    }
  }
  async uploadAvatar(id: number, filename: string): Promise<boolean> {
    await this.prisma.nguoi_dung.update({
      data: { hinh_dai_dien: filename },
      where: {
        id,
      },
    });
    return true
  }
}
