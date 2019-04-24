import { Injectable } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import { DataMapperService } from '../datamapper/datamapper.service';
import { OdometerHistory } from './odometer-history.entity';

@Injectable()
export class OdometerHistoryService {

    private mapper: DataMapper;

    constructor(mapperService: DataMapperService) {
      this.mapper = mapperService.mapper;
    }

    async put(entry: OdometerHistory) {
        await this.mapper.put(entry);
    }
}
