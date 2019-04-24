import { Injectable } from '@nestjs/common';
import { Vehicle } from './vehicle.entity';
import { DataMapperService } from '../datamapper/datamapper.service';
import { DataMapper } from '@aws/dynamodb-data-mapper';

@Injectable()
export class VehicleService {
  private mapper: DataMapper;

  constructor(private mapperService: DataMapperService) {
    this.mapper = mapperService.mapper;
  }

  async save(vehicle: Vehicle) {
    await this.mapper.put(vehicle);
  }

  async listVehicles() {
    const vehicles: Vehicle[] = [];

    for await (const vehicle of this.mapper.scan({valueConstructor: Vehicle})) {
        vehicles.push(vehicle);
    }

    return vehicles;
  }
}
