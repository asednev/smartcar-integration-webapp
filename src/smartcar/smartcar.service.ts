import { Injectable } from '@nestjs/common';
import * as smartcar from 'smartcar';
import { SmartCarConfigOptions } from './smartcar.config';
import { ConfigService } from 'src/common/config/config.service';

@Injectable()
export class SmartcarService {
  private readonly configObject: any;
  private accessToken: string;

  constructor(private configService: ConfigService) {
    this.configObject = {
      clientId: this.configService.get(SmartCarConfigOptions.ClientId),
      clientSecret: this.configService.get(SmartCarConfigOptions.ClientSecret),
      redirectUri: this.configService.get(SmartCarConfigOptions.RedirectUri),
      testMode: this.configService.get(SmartCarConfigOptions.TestMode),
    };
  }

  getAuthUrl() {
    const configObject = {
      ...this.configObject,
      scope: ['read_vehicle_info', 'read_odometer'],
    };

    const client = new smartcar.AuthClient(configObject);

    const link = client.getAuthUrl();

    return link;
  }

  async exchangeCode(code: string) {
    const configObject = {
      ...this.configObject,
      scope: ['read_vehicle_info', 'read_odometer'],
    };

    const client = new smartcar.AuthClient(configObject);

    const resp = await client.exchangeCode(code);

    console.log('resp', resp);

    const accessToken = resp.accessToken;
    this.accessToken = accessToken;
  }

  async link() {
    console.log('at', this.accessToken);

    const vehicleIds = await smartcar.getVehicleIds(this.accessToken);
    console.log(vehicleIds);
  }
}
