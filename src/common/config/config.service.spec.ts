import { ConfigService } from './config.service';

describe('Config.Service', () => {
  it('should be defined', () => {
    expect(new ConfigService('')).toBeDefined();
  });
});
