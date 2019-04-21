import { Controller, Get, Req, Query, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { ConfigService } from 'src/common/config/config.service';
import { SmartCarConfigOptions } from './smartcar.config';
import { SmartcarService } from './smartcar.service';

@Controller('smartcar')
export class SmartcarController {
  constructor(private service: SmartcarService) {}

  @Get('auth')
  getAuth(@Res() res: Response) {
    const link = this.service.getAuthUrl();
    res.redirect(link);
  }

  @Get('exchange')
  getExchange(@Req() request: Request, @Query('code') code: string) {
    // tslint:disable-next-line:no-console
    console.debug(request.url);
    // tslint:disable-next-line:no-console
    console.debug('code', code);

    if (code) {
      // update access token
      this.service.setAccessToken(code);
    }
  }
}
