import { Injectable } from '@nestjs/common';
import { DataMapper } from '@aws/dynamodb-data-mapper';
import * as AWS from 'aws-sdk';
import DynamoDB = require('aws-sdk/clients/dynamodb');
import { ConfigService } from 'src/common/config/config.service';

enum AWSConfigOptions {
  Region = 'AWS.Region',
  Profile = 'AWS.Profile',
}

@Injectable()
export class DataMapperService {
  // tslint:disable-next-line:variable-name
  private _mapper: DataMapper;

  constructor(private config: ConfigService) {

    const awsProfile = config.get(AWSConfigOptions.Profile);
    if (awsProfile) {
      // https://docs.aws.amazon.com/sdk-for-javascript/v2/developer-guide/loading-node-credentials-shared.html
      const credentials = new AWS.SharedIniFileCredentials({profile: awsProfile});
      AWS.config.credentials = credentials;
    }

    this._mapper = new DataMapper({
      client: new DynamoDB({ region: config.get(AWSConfigOptions.Region) }), // the SDK client used to execute operations
      tableNamePrefix: '', // optionally, you can provide a table prefix to keep your dev and prod tables separate
    });
  }

  get mapper() {
    return this._mapper;
  }
}
