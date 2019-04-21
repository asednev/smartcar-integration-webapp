import { Test, TestingModule } from '@nestjs/testing';
import { SmartcarController } from './smartcar.controller';

describe('Smartcar Controller', () => {
  let controller: SmartcarController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmartcarController],
    }).compile();

    controller = module.get<SmartcarController>(SmartcarController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
