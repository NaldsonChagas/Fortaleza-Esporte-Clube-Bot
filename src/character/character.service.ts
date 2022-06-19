import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Character } from './character';

@Injectable()
export class CharacterService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  public async getCharacters(): Promise<Character[]> {
    const characterEndpoint = this.configService.get<string>(
      'CHARACTHERS_ENDPOINT',
    );
    const response = await this.httpService.axiosRef.get(characterEndpoint);
    const { characters } = response.data;
    return characters;
  }
}
