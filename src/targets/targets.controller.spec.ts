import { Test, TestingModule } from '@nestjs/testing';
import { TargetsController } from './targets.controller';

describe('TargetsController', () => {
  let controller: TargetsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TargetsController],
    }).compile();

    controller = module.get<TargetsController>(TargetsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
