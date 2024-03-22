import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Res,
} from '@nestjs/common';

// Defines a controller with a base route of '/coffees'
@Controller('coffees')
export class CoffeesController {
  // Handles GET requests to '/coffees', returning all coffees
  @Get()
  // Below is an example of using express response object to send a response
  // But It is recommended to use the NestJS standard approach when dealing with responses whenever possible, because it provides a more consistent and predictable behavior across the application.
  findAll(@Res() response) {
    response.status(200).send('This action returns all coffees');
  }
  // findAll() {
  //   return 'This action returns all coffees';
  // }

  // Handles GET requests to '/coffees/:id', fetching a specific coffee by its id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return `This action returns #${id} coffee`;
  }

  @Post()
  @HttpCode(HttpStatus.GONE)
  create(@Body() body) {
    return body;
  }
}
