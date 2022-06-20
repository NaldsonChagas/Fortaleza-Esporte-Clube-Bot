import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { HeadlineService } from './headline.service';
import { HeadlineController } from './headline.controller';
import { PlayerModule } from 'src/player/player.module';
import { TeamModule } from 'src/team/team.module';
import { CharacterModule } from 'src/character/character.module';

@Module({
  providers: [HeadlineService],
  imports: [HttpModule, PlayerModule, TeamModule, CharacterModule],
  controllers: [HeadlineController],
})
export class HeadlineModule {}
