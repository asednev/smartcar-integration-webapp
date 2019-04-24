import { Controller, Get } from '@nestjs/common';
import { DataMapperService } from 'src/common/database/datamapper/datamapper.service';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { Vehicle } from 'src/common/database/vehicle/vehicle.entity';

@Controller('debug')
export class DebugController {

    private mapper: DataMapper;
    constructor(private aws: DataMapperService) {
        this.mapper = aws.mapper;
    }

    @Get('vehicles')
    async getVehicles() {

        const vehicles: Vehicle[] = [];

        for await (const vehicle of this.mapper.scan({valueConstructor: Vehicle})) {
            vehicles.push(vehicle);
        }

        return vehicles;
    }
}
