import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArrayUtils } from '../utils/array.utils';
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
      const attributesByVariables = {
        _fortalezaPlayer_: player.isFortalezaPlayer,
        _idolName_: player.isIdol,
        _iconicPlayer_: player.isIconic,
        _currentFortalezaPlayer_: player.isCurrentFortalezaPlayer,
        _playerName_: true,
      };
      if (Object.keys(attributesByVariables).includes(variable)) {
        return attributesByVariables[variable];
      }
    });

    return ArrayUtils.returnRandomItem<Player>(playersByVariable);
  }
}
