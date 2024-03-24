import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';

// Defines a controller with a base route of '/coffees'
@Controller('coffees')
export class CoffeesController {
  // Injects CoffeesService instance through the constructor for use in this controller.
  // The 'private readonly' keywords make the service available only within this class and its value immutable.
  constructor(private readonly coffeesService: CoffeesService) {}

  // Handles GET requests to '/coffees', returning all coffees
  @Get()
  findAll(@Query() paginationQuery) {
    // const { limit, offset } = paginationQuery;
    return this.coffeesService.findAll();
  }

  // Handles GET requests to '/coffees/:id', fetching a specific coffee by its id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.coffeesService.findOne(id);
  }

  // Handles POST requests to '/coffees', creating a new coffee
  @Post()
  create(@Body() body) {
    return this.coffeesService.create(body);
  }

  // Handles PATCH requests to '/coffees/:id', updating a specific coffee by its id
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return this.coffeesService.update(id, body);
  }

  // Handles DELETE requests to '/coffees/:id', removing a specific coffee by its id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.coffeesService.remove(id);
  }
}
