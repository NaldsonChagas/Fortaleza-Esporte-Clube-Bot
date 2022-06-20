import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArrayUtils } from 'src/utils/array.utils';
import { Player } from './player';

@Injectable()
export class PlayerService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getPlayers(): Promise<Player[]> {
    const playersEndpoint = this.configService.get<string>('PLAYERS_ENDPOINT');
    const response = await this.httpService.axiosRef.get(playersEndpoint);
    const { players } = response.data;
    return players;
  }

  public async getRandomPlayer(variable: string): Promise<Player> {
    const players = await this.getPlayers();

    const playersByVariable = players.filter((player) => {
      if (variable === '_fortalezaPlayer_') return player.isFortalezaPlayer;
      else if (variable === '_idolName_') return player.isIdol;
      else if (variable === '_iconicPlayer_') return player.isIconic;
      else if (variable === '_currentFortalezaPlayer_')
        return player.isCurrentFortalezaPlayer;
      else return players;
    });

    return ArrayUtils.returnRandomItem<Player>(playersByVariable);
  }
}
