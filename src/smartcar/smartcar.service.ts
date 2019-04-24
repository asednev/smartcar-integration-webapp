import { Injectable } from '@nestjs/common';
import * as smartcar from 'smartcar';
import { SmartCarConfigOptions } from './smartcar.config';
import { ConfigService } from 'src/common/config/config.service';
import { VehicleService } from 'src/common/database/vehicle/vehicle.service';
import { Vehicle } from 'src/common/database/vehicle/vehicle.entity';

@Injectable()
export class SmartcarService {
  private readonly configObject: any;

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

  async exchange(code: string) {
    const configObject = {
      ...this.configObject,
      scope: ['read_vehicle_info', 'read_odometer'],
    };

    const client = new smartcar.AuthClient(configObject);

    const accessObject: {
      accessToken: string,
      refreshToken: string,
      expiration: Date,
      refreshExpiration: Date,
    } = await client.exchangeCode(code);

    const accessToken = accessObject.accessToken;

    const vehiclesObject: {
      vehicles: string[],
    } = await smartcar.getVehicleIds(accessToken);

    vehiclesObject.vehicles.map(async vehicleId => {
      const v = new Vehicle();
      v.vehicleId = vehicleId;
      v.accessToken = accessObject.accessToken;
      v.refreshToken = accessObject.refreshToken;
      v.accessTokenExpriration = accessObject.expiration;
      v.refreshExpiration = accessObject.refreshExpiration;

      await this.vehicleService.save(v);
    });
  }
}
