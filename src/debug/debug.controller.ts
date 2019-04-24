import { Controller, Get } from '@nestjs/common';
import { DataMapperService } from 'src/common/database/datamapper/datamapper.service';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Vehicle } from 'src/common/database/vehicle/vehicle.entity';
import { VehicleService } from 'src/common/database/vehicle/vehicle.service';

@Controller('debug')
export class DebugController {

    private mapper: DataMapper;
    constructor(
        private vehicleService: VehicleService,
        private aws: DataMapperService) {
        this.mapper = aws.mapper;
    }

    @Get('vehicles')
    async getVehicles() {
        return await this.vehicleService.listVehicles();
    }
}
