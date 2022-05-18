import { DataTypes, Model } from 'sequelize'
import { loadSequelizePromise, connection, loadSequelize } from './postgresDb'


export const CityModel = async (sequelize) => {
    const City: Model = sequelize.define('City', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING
        },
        continent: {
            type: DataTypes.STRING,
            get() {
                const value = this.getDataValue('continent');
                return value ? value.toUpperCase() : null;
            }
        },
        code: {
            type: DataTypes.STRING,
            set(value: string) {
                this.setDataValue('code', value.toUpperCase())
            }
        },
    }, {
        paranoid: true
    });

    City.hasOne()

    return City;
}






