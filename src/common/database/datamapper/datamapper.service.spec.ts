import { Test, TestingModule } from '@nestjs/testing';
import { DatamapperService } from './datamapper.service';

describe('DatamapperService', () => {
  let service: DatamapperService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DatamapperService],
    }).compile();

    service = module.get<DatamapperService>(DatamapperService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
