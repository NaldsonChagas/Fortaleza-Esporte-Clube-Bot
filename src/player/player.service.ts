import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
}
