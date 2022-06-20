import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HeadlineService } from './headline.service';
import { HeadlineController } from './headline.controller';
import { PlayerModule } from 'src/player/player.module';

@Module({
  providers: [HeadlineService],
  imports: [HttpModule, PlayerModule],
  controllers: [HeadlineController],
})
export class HeadlineModule {}
