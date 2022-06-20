import { Test, TestingModule } from '@nestjs/testing';
import { HeadlineController } from './headline.controller';

describe('HeadlineController', () => {
  let controller: HeadlineController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HeadlineController],
    }).compile();

    controller = module.get<HeadlineController>(HeadlineController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
