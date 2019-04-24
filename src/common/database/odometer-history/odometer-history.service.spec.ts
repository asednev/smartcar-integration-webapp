import { Test, TestingModule } from '@nestjs/testing';
import { OdometerHistoryService } from './odometer-history.service';

describe('OdometerHistoryService', () => {
  let service: OdometerHistoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OdometerHistoryService],
    }).compile();

    service = module.get<OdometerHistoryService>(OdometerHistoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
