import {Entity, PrimaryGeneratedColumn, Column, OneToMany} from "typeorm";
import { Property } from './Property';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
        length: 100
    })
    username: string;

    @Column()
    email: string;

    @Column()
    password: string;

    @Column({default: false})
    isadmin: Boolean;

    @OneToMany(type => Property, property => property.user)
    properties: Property[];
}
