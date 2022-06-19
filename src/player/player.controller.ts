import { Controller, Get } from '@nestjs/common';
import { PlayerService } from './player.service';

@Controller('player')
export class PlayerController {
  constructor(private readonly playersService: PlayerService) {}

  @Get()
  public async index() {
    const players = await this.playersService.getPlayers();
    return players;
  }
}
