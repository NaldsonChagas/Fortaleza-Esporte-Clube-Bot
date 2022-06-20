import { Test, TestingModule } from '@nestjs/testing';
import { HeadlineService } from './headline.service';

describe('HeadlineService', () => {
  let service: HeadlineService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HeadlineService],
    }).compile();

    service = module.get<HeadlineService>(HeadlineService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
