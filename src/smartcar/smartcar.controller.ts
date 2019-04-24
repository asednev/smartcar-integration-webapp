import { Controller, Get, Req, Query, Res } from '@nestjs/common';
import { Response } from 'express';
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
  async getExchange(@Query('code') code: string) {

    if (code) {
      await this.service.exchange(code);
    }
  }
}
