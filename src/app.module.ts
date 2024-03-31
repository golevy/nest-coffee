import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CoffeesModule } from './coffees/coffees.module';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    CoffeesModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'password',
      database: 'postgres',
      autoLoadEntities: true, // models will be loaded automatically (not recommended for production)
      synchronize: true, // Setting synchronize: true shouldn't be used in production - otherwise you can lose production data.
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
