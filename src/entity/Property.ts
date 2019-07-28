import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './User';

@Entity()
export class Property {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  price: number;

  @Column()
  state: string

  @Column()
  type: string

  @Column()
  imageurl: string

  @ManyToOne(type => User, user => user.properties)
  user: User;
}