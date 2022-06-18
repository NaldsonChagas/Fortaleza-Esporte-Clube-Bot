import { Module } from '@nestjs/common';
import { PlayerController } from './player.controller';
import { PlayerService } from './player.service';
import { HttpModule } from '@nestjs/axios'
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [HttpModule, ConfigModule],
  controllers: [PlayerController],
  providers: [PlayerService]
})
export class PlayerModule {}
