import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PlayerService } from 'src/player/player.service';
import { TeamService } from 'src/team/team.service';
import { ArrayUtils } from 'src/utils/ArrayUtils';
import { Variable } from 'src/variables/variables';
import { Headline } from './headline';

@Injectable()
export class HeadlineService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly playerService: PlayerService,
    private readonly teamService: TeamService,
  ) {}

  public async getHeadlines(): Promise<Headline[]> {
    const headlineEnpoint = this.configService.get('HEADLINES_ENDPOINT');
    const response = await this.httpService.axiosRef.get(headlineEnpoint);
    const { headlines } = response.data;
    return headlines;
  }

  public async getFormattedRandomHeadline(): Promise<Headline> {
    const headlines = await this.getHeadlines();
    let headline = ArrayUtils.returnRandomItem<Headline>(headlines);

    const variables = headline.title
      .split(' ')
      .filter((word) => word.startsWith('_'));

    for (const variable of variables) {
      if (Variable.PLAYER_VARIABLES.includes(variable)) {
        const randomPlayer = await this.playerService.getRandomPlayer(variable);
        headline = this.inputVariable(headline, variable, randomPlayer.name);
      }

      if (Variable.TEAM_VARIABLES.includes(variable)) {
        const randomTeam = await this.teamService.getRandomTeam();
        headline = this.inputVariable(headline, variable, randomTeam.name);
      }
    }
    return headline;
  }

  private inputVariable(
    headline: Headline,
    variable: string,
    value: string,
  ): Headline {
    headline.title = headline.title.split(variable).join(value);
    return headline;
  }
}
