import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryColumn,
} from 'typeorm';
import { v4 as uuidv4 } from 'uuid';
import { Category } from './category';
import { Specification } from './Specification';

@Entity('cars')
export class Car {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  daily_rate: number;

  @Column()
  available: boolean;

  @Column()
  license_plate: string;

  @Column()
  fine_amunt: number;

  @Column()
  brand: string;

  @ManyToOne(() => Category)
  @JoinTable({
    name: 'specifications_cars',
    joinColumns: [{ name: 'car_id' }],
    inverseJoinColumns: [{ name: 'specifications_cars' }],
  })
  category: Category;

  @Column()
  category_id: string;

  @ManyToMany(() => Specification)
  specifications: Specification[];

  @CreateDateColumn()
  create_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidv4();
      this.available = true;
    }
  }
}
