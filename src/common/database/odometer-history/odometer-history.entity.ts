import {
    attribute,
    hashKey,
    table,
    rangeKey,
  } from '@aws/dynamodb-data-mapper-annotations';

@table('odo-odometerHistory')
export class OdometerHistory {
    @hashKey()
    vehicleId: string;

    @rangeKey()
    date: Date;

    @attribute()
    odometer: number;
}
