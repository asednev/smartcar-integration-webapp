import { Controller, Get, Req, Query } from '@nestjs/common';
import { Request } from 'express';
import { ConfigService } from 'src/common/config/config.service';
import { SmartCarConfigOptions } from './smartcar.config';

@Controller('smartcar')
export class SmartcarController {
  constructor(private configService: ConfigService) {
    // tslint:disable-next-line:no-console
    console.debug(
      'testMode',
      configService.get(SmartCarConfigOptions.TestMode),
    );
  }

  @Get('exchange')
  getExchange(@Req() request: Request, @Query('code') code: string): string {
    // tslint:disable-next-line:no-console
    console.debug(request.url);
    // tslint:disable-next-line:no-console
    console.debug('code', code);

    return 'hello smart car';
  }
}
