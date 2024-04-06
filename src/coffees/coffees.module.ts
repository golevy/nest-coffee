import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 👈 Adding Entities here to the imports
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      // Token to inject coffee brands array across the application
      provide: COFFEE_BRANDS,
      // Provides an array of coffee brand names for injection
      useValue: ['buddy brew', 'nescafe'],
    },
  ],
  exports: [CoffeesService], // 👈 Making the provider available to other modules
})
export class CoffeesModule {}
