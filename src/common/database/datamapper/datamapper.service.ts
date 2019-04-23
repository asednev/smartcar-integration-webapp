import { Injectable } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { ConfigService } from 'src/common/config/config.service';

enum AWSConfigOptions {
  Region = 'AWS.Region',
}

@Injectable()
export class DataMapperService {
  // tslint:disable-next-line:variable-name
  private _mapper: DataMapper;

  constructor(private config: ConfigService) {
    this._mapper = new DataMapper({
      client: new DynamoDB({ region: config.get(AWSConfigOptions.Region) }), // the SDK client used to execute operations
      tableNamePrefix: '', // optionally, you can provide a table prefix to keep your dev and prod tables separate
    });
  }

  get mapper() {
    return this._mapper;
  }
}
