import { Controller, Get, Param, Post, Req, Body } from '@nestjs/common';
import { AppService } from './app.service';
import { Request } from 'express';
import { ConfigService } from '@nestjs/config';
import { User } from './dto';

@Controller("/demo") // => route
export class AppController {
  constructor(
    private readonly appService: AppService,
    private config: ConfigService
  ) { }

  // @Get("/getUser")
  // getUser(@Body() body: User): Promise<User[]> {
  //   return this.appService.getUser();
  // }

  @Get()
  getEnv(): string {
    return this.config.get("NEST_TEST");
  }

  @Get("/:email") // => route api
  getHello(
    @Req() req: Request,
    @Param("email") param: string,
    @Body() body: any
  ): string {
    // let data = req.params.id;
    // let dataBody = req.body;

    return body;
  }

  @Post("/:soMot/:soHai") // => route api
  getSum(@Req() req: Request): number {
    let { soMot, soHai } = req.params;

    return this.appService.getSum(Number(soMot), Number(soHai)); // => res.send()
  }
}
