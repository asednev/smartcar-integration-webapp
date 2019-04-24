import { Injectable, Logger } from '@nestjs/common';
import * as smartcar from 'smartcar';
import { SmartCarConfigOptions } from './smartcar.config';
import { ConfigService } from 'src/common/config/config.service';
import { VehicleService } from 'src/common/database/vehicle/vehicle.service';
import { Vehicle } from 'src/common/database/vehicle/vehicle.entity';

@Injectable()
export class SmartcarService {
  private readonly configObject: any;

  constructor(
    private logger: Logger,
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
      accessToken: string;
      refreshToken: string;
      expiration: Date;
      refreshExpiration: Date;
    } = await client.exchangeCode(code);

    const accessToken = accessObject.accessToken;

    const vehiclesObject: {
      vehicles: string[];
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

  async updateBatch() {
    this.logger.verbose('updateBatch, begin');

    /*
      1. Update Odometer value
         - scan vehicles table in Dynamo
         - for each vehicle, query odometer data from SmartCar
         - update vehicles table with latest odometer reading
         - add odometer value into the event log
     */

    const vehicles = await this.vehicleService.listVehicles();

    vehicles.forEach(async v => {
      const timeLabel = `Process ${v.vehicleId}`;
      this.logger.verbose(timeLabel);
      // tslint:disable-next-line: no-console
      console.time(timeLabel);

      const updatedV = await this.updateOdometer(v);

      if (updatedV !== v) {
        this.vehicleService.save(updatedV);

        //TODO: save changes into event log
      }

      // tslint:disable-next-line: no-console
      console.timeEnd(timeLabel);
    });
  }

  private async updateOdometer(vehicle: Vehicle): Promise<Vehicle> {
    // query odometer data ->
    // persist in DynamoDB
    const UNIT_SYSTEM = 'imperial';

    try {
      const vehicleQuery = new smartcar.Vehicle(
        vehicle.vehicleId,
        vehicle.accessToken,
        UNIT_SYSTEM,
      );

      const odometerObject: {
        data: {
          /** The reading of the vehicle's odometer. */
          distance: number;
        };
        /** The timestamp of when the data was recorded. */
        age: Date;
      } = await vehicleQuery.odometer();

      const result: Vehicle = Object.create(vehicle);
      result.odometer = odometerObject.data.distance;
      result.odometerUpdated = odometerObject.age;

      return result;
    } catch (error) {
      // tslint:disable-next-line: no-console
      this.logger.error(`failed to update vehicle ${vehicle.vehicleId}: ` + error);
      return vehicle;
    }
  }
}
