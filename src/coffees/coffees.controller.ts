import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { REQUEST } from '@nestjs/core';

// Defines a controller with a base route of '/coffees'
@Controller('coffees')
export class CoffeesController {
  // Injects CoffeesService instance through the constructor for use in this controller.
  // The 'private readonly' keywords make the service available only within this class and its value immutable.
  constructor(
    private readonly coffeesService: CoffeesService,
    @Inject(REQUEST) private readonly request: Request,
  ) {
    console.log('CoffeesController created');
  }

  // Handles GET requests to '/coffees', returning all coffees
  @Get()
  findAll(@Query() paginationQuery: PaginationQueryDto) {
    return this.coffeesService.findAll(paginationQuery);
  }

  // Handles GET requests to '/coffees/:id', fetching a specific coffee by its id
  @Get(':id')
  findOne(@Param('id') id: number) {
    console.log(typeof id); // method to check the type of the id parameter
    return this.coffeesService.findOne(id); // the id parameter is converted to a string by concatenating it with an empty string
  }

  // Handles POST requests to '/coffees', creating a new coffee
  @Post()
  create(@Body() createCoffeeDto: CreateCoffeeDto) {
    console.log(createCoffeeDto instanceof CreateCoffeeDto); // method to check if the object is an instance of the CreateCoffeeDto class
    return this.coffeesService.create(createCoffeeDto);
  }

  // Handles PATCH requests to '/coffees/:id', updating a specific coffee by its id
  @Patch(':id')
  update(@Param('id') id: number, @Body() updateCoffeeDto: UpdateCoffeeDto) {
    return this.coffeesService.update(id, updateCoffeeDto);
  }

  // Handles DELETE requests to '/coffees/:id', removing a specific coffee by its id
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.coffeesService.remove(id);
  }
}
