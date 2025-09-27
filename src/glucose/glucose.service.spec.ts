import { Test, TestingModule } from '@nestjs/testing';
import { GlucoseService } from './glucose.service';

describe('GlucoseService', () => {
  let service: GlucoseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GlucoseService],
    }).compile();

    service = module.get<GlucoseService>(GlucoseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
