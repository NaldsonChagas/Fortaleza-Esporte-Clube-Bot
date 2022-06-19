import { HttpModule, HttpService } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { Character } from './character';
import { CharacterService } from './character.service';

const characters: Character[] = [
  { name: 'Character 1' },
  { name: 'Character 2' },
];

describe('CharacterService', () => {
  let service: CharacterService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule, ConfigModule],
      providers: [
        CharacterService,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (key === 'CHARACTERS_ENDPOINT')
                return 'http://localhost/testing';
              return null;
            }),
          },
        },
        {
          provide: HttpService,
          useValue: {
            axiosRef: {
              get: jest.fn(() => {
                const data = { characters };
                return { data };
              }),
            },
          },
        },
      ],
    }).compile();

    service = module.get<CharacterService>(CharacterService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Test get all characters method', () => {
    it('Should return all characters', async () => {
      const result: Promise<Character[]> = new Promise((resolve) =>
        resolve(characters),
      );

      expect(await service.getCharacters()).toBe(await result);
    });
  });
});
