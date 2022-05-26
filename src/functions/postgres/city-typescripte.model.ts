import { Table, Column, Model, HasMany, IsUUID, PrimaryKey, DataType, BelongsTo, ForeignKey, BelongsToMany, AfterFind, HookOptions } from 'sequelize-typescript'
import { Country } from './country-typescipt'
import { People, PeopleCity } from './people-typescipt.model'

@Table({
    timestamps: true
})
export class City extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Column({ defaultValue: DataType.UUIDV4, type: DataType.UUID })
    id: number

    @Column({ type: DataType.STRING })
    name: string

    @Column({ type: DataType.STRING })
    country: string

    @Column({ type: DataType.STRING })
    continent: string

    @Column({ type: DataType.STRING })
    code: string

    @ForeignKey(() => Country)
    @Column({ type: DataType.UUID })
    countryId: string

    @BelongsTo(() => Country)
    FCountry: Country

    @BelongsToMany(() => People, () => PeopleCity)
    peoples: Array<People & { PeopleCity: PeopleCity }>

    @AfterFind
    static makeUpperCase(instance: HookOptions) {
        console.log(instance);
        instance.name = instance.name.toLocaleUpperCase()
    }
}

