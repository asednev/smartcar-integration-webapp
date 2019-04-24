import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { VehicleService } from './vehicle/vehicle.service';
import { DataMapperService } from './datamapper/datamapper.service';
import { OdometerHistoryService } from './odometer-history/odometer-history.service';

@Module({
  imports: [ConfigModule],
  providers: [VehicleService, DataMapperService, OdometerHistoryService],
  exports: [VehicleService, DataMapperService, OdometerHistoryService],
})
export class DatabaseModule {}
