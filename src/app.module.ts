import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PlayerModule } from './player/player.module';
import { ConfigModule } from '@nestjs/config';
import { CharacterModule } from './character/character.module';
@Module({
  imports: [PlayerModule, ConfigModule.forRoot({ isGlobal: true }), CharacterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
