import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Player } from './player';
import { PlayerService } from './player.service';

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

describe('PlayerService', () => {
  let service: PlayerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        PlayerService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'PLAYERS_ENDPOINT') return 'http://localhost/testing';
              return null;
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(() => {
                const data = { players };
                return { data };
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<PlayerService>(PlayerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test get all players method', () => {
    it('Should return all players', async () => {
      const result: Promise<Player[]> = new Promise((resolve) =>
        resolve(players),
      );

      expect(await service.getPlayers()).toBe(await result);
    });
  });
});
