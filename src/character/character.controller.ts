import { Controller, Get } from '@nestjs/common';
import { CharacterService } from './character.service';

@Controller('character')
export class CharacterController {
  constructor(private readonly characterService: CharacterService) {}

  @Get()
  public async index() {
    const characters = await this.characterService.getCharacters();
    return characters;
  }
}
