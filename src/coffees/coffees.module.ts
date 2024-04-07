import { Module, Scope } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';
import { COFFEE_BRANDS } from './coffees.constants';
import { DataSource } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 👈 Adding Entities here to the imports
  controllers: [CoffeesController],
  providers: [
    CoffeesService,
    {
      // Token to inject coffee brands array across the application
      provide: COFFEE_BRANDS,
      useFactory: async (coffeeConnection: DataSource): Promise<string[]> => {
        const coffeeBrands = await Promise.resolve(['buddy brew', 'nescafe']);
        console.log('[!] Async factory');
        return coffeeBrands;
      },
      scope: Scope.TRANSIENT,
      inject: [DataSource],
    },
  ],
  exports: [CoffeesService], // 👈 Making the provider available to other modules
})
export class CoffeesModule {}
