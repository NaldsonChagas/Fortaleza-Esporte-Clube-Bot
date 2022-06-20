import { Controller, Get } from '@nestjs/common';
import { HeadlineService } from './headline.service';

@Controller('headline')
export class HeadlineController {
  constructor(private readonly headlineService: HeadlineService) {}

  @Get()
  public index() {
    const randomHeadline = this.headlineService.getFormattedRandomHeadline();
    return randomHeadline;
  }
}
