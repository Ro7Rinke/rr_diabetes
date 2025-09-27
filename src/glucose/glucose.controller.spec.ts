import { Test, TestingModule } from '@nestjs/testing';
import { GlucoseController } from './glucose.controller';

describe('GlucoseController', () => {
  let controller: GlucoseController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GlucoseController],
    }).compile();

    controller = module.get<GlucoseController>(GlucoseController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
