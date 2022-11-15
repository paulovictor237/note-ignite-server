import { v4 as uuidv4 } from 'uuid';
import { Column, CreateDateColumn, Entity, PrimaryColumn } from 'typeorm';

@Entity('categories')
export class Category {
  @PrimaryColumn()
  id?: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @CreateDateColumn()
  create_at?: Date;

  constructor() {
    if (!this.id) this.id = uuidv4();
    if (!this.create_at) this.create_at = new Date();
  }
}
