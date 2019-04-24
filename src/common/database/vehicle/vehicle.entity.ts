import {
  attribute,
  hashKey,
  table,
} from '@aws/dynamodb-data-mapper-annotations';

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
}
