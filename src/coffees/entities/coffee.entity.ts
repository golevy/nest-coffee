import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flavor } from './flavor.entity';

@Entity() // SQL table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn() // SQL column === 'id'
  id: number;

  @Column() // SQL column === 'name'
  name: string;

  @Column() // SQL column === 'brand'
  brand: string;

  @JoinTable() // 👈 Join the 'coffee' and 'flavor' tables
  @ManyToMany((type) => Flavor, (flavor) => flavor.coffees) // 👈 Define the many-to-many relationship
  flavors: string[];
}
