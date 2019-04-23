import { Module } from '@nestjs/common';
import { ConfigModule } from '../config/config.module';
import { VehicleService } from './vehicle/vehicle.service';
import { DataMapperService } from './datamapper/datamapper.service';

@Module({
  imports: [ConfigModule],
  providers: [VehicleService, DataMapperService],
  exports: [VehicleService],
})
export class DatabaseModule {}
