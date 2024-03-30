import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity() // SQL table === 'coffee'
export class Coffee {
  @PrimaryGeneratedColumn() // SQL column === 'id'
  id: number;

  @Column() // SQL column === 'name'
  name: string;

  @Column() // SQL column === 'brand'
  brand: string;

  @Column('json', { nullable: true }) // SQL column === 'flavors'
  flavors: string[];
}
