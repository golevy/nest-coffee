import { Body, Controller, Get, Param, Post } from '@nestjs/common';

// Defines a controller with a base route of '/coffees'
@Controller('coffees')
export class CoffeesController {
  // Handles GET requests to '/coffees', returning all coffees
  @Get()
  findAll() {
    return 'This action returns all coffees';
  }

  // Handles GET requests to '/coffees/:id', fetching a specific coffee by its id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }
}
