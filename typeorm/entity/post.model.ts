import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class Post {
    @PrimaryGeneratedColumn('increment')
    id: number

    @Column('text')
    title: string

    @Column('text')
    text: string

    @Column('text')
    address: string

}