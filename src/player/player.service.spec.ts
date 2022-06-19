import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Player } from './player';
import { PlayerService } from './player.service';

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [PlayerService],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test get all players methot', () => {
    it('Should reurn all players', async () => {
      const players: Player[] = [
        {
          name: 'Player 1',
          isFortalezaPlayer: true,
          isIdol: true,
          isIconic: true,
          isCurrentFortalezaPlayer: true,
        },
        {
          name: 'Player 2',
          isFortalezaPlayer: true,
          isIdol: true,
          isIconic: true,
          isCurrentFortalezaPlayer: true,
        },
      ];

      const result: Promise<Player[]> = new Promise((resolve) =>
        resolve(players),
      );

      jest.spyOn(service, 'getPlayers').mockImplementation(() => result);

      expect(await service.getPlayers()).toBe(await result);
    });
  });
});
