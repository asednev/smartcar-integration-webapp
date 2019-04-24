import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';
import { OdometerHistory } from '../odometer-history/odometer-history.entity';

@table('odo-vehicle')
export class Vehicle {
  @hashKey()
  vehicleId: string;

  @attribute()
  accessToken: string;

  @attribute()
  refreshToken: string;

  @attribute()
  accessTokenExpriration: Date;

  @attribute()
  refreshExpiration: Date;

  @attribute()
  odometer: number;

  @attribute()
  odometerUpdated: Date;

  toHistoryEntry(): OdometerHistory {
    const entry = new OdometerHistory();

    entry.vehicleId = this.vehicleId;
    entry.date = this.odometerUpdated;
    entry.odometer = this.odometer;

    return entry;
  }
}
