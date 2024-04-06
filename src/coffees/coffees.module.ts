import { Module } from '@nestjs/common';
import { CoffeesController } from './coffees.controller';
import { CoffeesService } from './coffees.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Coffee } from './entities/coffee.entity';
import { Flavor } from './entities/flavor.entity';
import { Event } from 'src/events/entities/event.entity';

class MockCoffeeService {}

@Module({
  imports: [TypeOrmModule.forFeature([Coffee, Flavor, Event])], // 👈 Adding Entities here to the imports
  controllers: [CoffeesController],
  providers: [
    {
      provide: CoffeesService, // 👈 This is the token that can be used to inject the dependency
      useValue: new MockCoffeeService(), // 👈 Here we provide a mock implementation for CoffeesService
      // useValue allows us to provide a specific value as a service. In this case,
      // instead of the actual CoffeesService, we're using a mock service.
      // This is useful for testing, as it allows us to replace a real service
      // with a mock implementation, ensuring our tests are not affected by the
      // actual logic of the CoffeesService.
    },
  ],
  exports: [CoffeesService], // 👈 Making the provider available to other modules
})
export class CoffeesModule {}
