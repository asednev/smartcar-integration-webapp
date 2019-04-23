import { Injectable } from '@nestjs/common';
import * as smartcar from 'smartcar';
import { SmartCarConfigOptions } from './smartcar.config';
import { ConfigService } from 'src/common/config/config.service';
import { VehicleService } from 'src/common/database/vehicle/vehicle.service';
import { Vehicle } from 'src/common/database/vehicle/vehicle.entity';

@Injectable()
export class SmartcarService {
  private readonly configObject: any;
  private previousResponse: any;

  constructor(
    private configService: ConfigService,
    private vehicleService: VehicleService,
  ) {
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

    const res = await client.exchangeCode(code);

    // tslint:disable-next-line:no-console
    console.debug('response', res);

    this.previousResponse = res;
  }

  async link() {
    const accessToken = this.previousResponse.accessToken;
    console.log('at', accessToken);

    const res = await smartcar.getVehicleIds(accessToken);
    console.log(res);

    res.vehicles.map(async vehicleId => {
      const v = new Vehicle();
      v.vehicleId = vehicleId;
      v.accessToken = this.previousResponse.accessToken;
      v.refreshToken = this.previousResponse.refreshToken;
      v.accessTokenExpriration = this.previousResponse.expiration;
      v.refreshExpiration = this.previousResponse.refreshExpiration;

      await this.vehicleService.save(v);
    });
  }
}
