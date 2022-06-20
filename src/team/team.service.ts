import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ArrayUtils } from 'src/utils/array.utils';
import { Team } from './team';

@Injectable()
export class TeamService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getTeams(): Promise<Team[]> {
    const teamsEndpoint = this.configService.get('TEAMS_ENDPOINT');
    const response = await this.httpService.axiosRef.get(teamsEndpoint);
    const { teams } = response.data;
    return teams;
  }

  public async getRandomTeam(): Promise<Team> {
    const teams = await this.getTeams();
    return ArrayUtils.returnRandomItem<Team>(teams);
  }
}
