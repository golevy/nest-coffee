import { IsOptional, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional() // This decorator makes the property optional
  @IsPositive() // This decorator checks if the value is a positive number
  limit: number;

  @IsOptional()
  @IsPositive()
  offset: number;
}
