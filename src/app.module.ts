import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './character/character.module';
import { HeadlineModule } from './headline/headline.module';
import { TeamModule } from './team/team.module';
@Module({
  imports: [PlayerModule, ConfigModule.forRoot({ isGlobal: true }), CharacterModule, HeadlineModule, TeamModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
