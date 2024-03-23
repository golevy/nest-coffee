import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Res,
} from '@nestjs/common';

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

  // Handles POST requests to '/coffees', creating a new coffee
  @Post()
  create(@Body() body) {
    return body;
  }

  // Handles PATCH requests to '/coffees/:id', updating a specific coffee by its id
  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  // Handles DELETE requests to '/coffees/:id', removing a specific coffee by its id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
