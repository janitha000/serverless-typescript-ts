import { Table, Column, Model, HasMany, IsUUID, PrimaryKey, DataType } from 'sequelize-typescript'
import { City } from './city-typescripte.model'

@Table({
    timestamps: true
})
export class Country extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
    id: number

    @Column({ type: DataType.STRING })
    name: string

    @HasMany(() => City)
    cities: City[]

    // @HasMany(() => Hobby)
    // hobbies: Hobby[]
}
