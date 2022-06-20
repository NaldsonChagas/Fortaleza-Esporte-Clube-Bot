import { Module } from '@nestjs/common';
import { PlayerService } from './player.service';
import { HttpModule } from '@nestjs/axios';
@Module({
  imports: [HttpModule],
  providers: [PlayerService],
  exports: [PlayerService],
})
export class PlayerModule {}
