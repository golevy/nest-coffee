import { Test, TestingModule } from '@nestjs/testing';
import { CoffeesService } from './coffees.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import coffeesConfig from './config/coffees.config';

describe('CoffeesService', () => {
  let service: CoffeesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CoffeesService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(Coffee),
          useValue: {},
        },
        {
          provide: getRepositoryToken(Flavor),
          useValue: {},
        },
        {
          provide: coffeesConfig.KEY,
          useValue: { foo: 'bar' },
        },
      ],
    }).compile();

    // service = module.get<CoffeesService>(CoffeesService); // For default-scoped services, use module.get() to retrieve the service instance synchronously.
    service = await module.resolve<CoffeesService>(CoffeesService); // For request-scoped services, use module.resolve() to retrieve the service instance asynchronously.
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
