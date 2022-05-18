import { Table, Column, Model, HasMany, IsUUID, PrimaryKey, DataType, BelongsTo, ForeignKey, BelongsToMany } from 'sequelize-typescript'
import { City } from './city-typescripte.model'
import { Country } from './country-typescipt'

@Table({
    timestamps: true
})
export class People extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
    id: string

    @Column({ type: DataType.STRING })
    name: string

    @BelongsToMany(() => City, () => PeopleCity)
    cities: City[]
}


@Table({
    tableName: 'PeopleCity',
    timestamps: false
})
export class PeopleCity extends Model {
    @ForeignKey(() => People)
    @Column({ type: DataType.STRING })
    peopleId: string

    @ForeignKey(() => City)
    @Column({ type: DataType.STRING })
    cityId: string
}
