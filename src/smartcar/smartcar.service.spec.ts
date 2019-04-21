import { Test, TestingModule } from '@nestjs/testing';
import { SmartcarService } from './smartcar.service';

describe('SmartcarService', () => {
  let service: SmartcarService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SmartcarService],
    }).compile();

    service = module.get<SmartcarService>(SmartcarService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
