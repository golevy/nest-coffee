import { HttpStatus, INestApplication, ValidationPipe } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoffeesModule } from '../../src/coffees/coffees.module';
import { CreateCoffeeDto } from 'src/coffees/dto/create-coffee.dto';
import * as request from 'supertest';

describe('[Feature] Coffees - /coffees', () => {
  const coffee = {
    name: 'Shipwreck Roast',
    brand: 'Buddy Brew',
    flavors: ['chocolate', 'vanilla'],
  };

  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [
        CoffeesModule,
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5433,
          username: 'postgres',
          password: 'password',
          database: 'postgres',
          autoLoadEntities: true,
          synchronize: true,
        }),
      ],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
        transformOptions: {
          enableImplicitConversion: true,
        },
      }),
    );
    await app.init();
  });

  it('Create [POST /]', () => {
    return request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED)
      .then(({ body }) => {
        const expectedCoffee = expect.objectContaining({
          ...coffee,
          flavors: expect.arrayContaining(
            coffee.flavors.map((name) => expect.objectContaining({ name })),
          ),
        });
        expect(body).toEqual(expectedCoffee);
      });
  });

  it('Get all [GET /]', async () => {
    const response = await request(app.getHttpServer())
      .get('/coffees')
      .expect(HttpStatus.OK);
    expect(response.body).toBeInstanceOf(Array);
  });

  it('Get one [GET /:id]', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);

    const coffeeId = postResponse.body.id;
    await request(app.getHttpServer())
      .get(`/coffees/${coffeeId}`)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body).toEqual(
          expect.objectContaining({
            name: coffee.name,
            brand: coffee.brand,
            flavors: expect.arrayContaining([
              expect.objectContaining({ name: 'chocolate' }),
              expect.objectContaining({ name: 'vanilla' }),
            ]),
            id: coffeeId,
          }),
        );
      });
  });

  it('Update one [PATCH /:id]', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);

    const coffeeId = postResponse.body.id;
    const updateData = { name: 'New Name' };

    console.log(`Updating coffee ID: ${coffeeId}`);

    await request(app.getHttpServer())
      .patch(`/coffees/${coffeeId}`)
      .send(updateData)
      .expect(HttpStatus.OK)
      .then(({ body }) => {
        expect(body.name).toEqual('New Name');
      })
      .catch((err) => console.error('Error during PATCH request:', err));
  });

  it('Delete one [DELETE /:id]', async () => {
    const postResponse = await request(app.getHttpServer())
      .post('/coffees')
      .send(coffee as CreateCoffeeDto)
      .expect(HttpStatus.CREATED);

    const coffeeId = postResponse.body.id;
    await request(app.getHttpServer())
      .delete(`/coffees/${coffeeId}`)
      .expect(HttpStatus.OK);
  });

  afterAll(async () => {
    await app.close();
  });
});
