import { DataTypes, Model, Sequelize } from "sequelize/types";

export const CityModel = (sequelize, Sequelize) => {
    const City: Model = sequelize.define('City', {
        // Model attributes are defined here
        name: {
            type: Sequelize.DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: Sequelize.DataTypes.STRING
            // allowNull defaults to true
        },
        continent: {
            type: Sequelize.DataTypes.STRING
            // allowNull defaults to true
        },
    }, {
        // Other model options go here
    });
    return City;
}


// export const CityClass = (sequelize: Sequelize) => {
//     class City extends Model {
//         public id?: number
//         public name!: string
//         public country!: string
//         public continent!: string
//     }

//     City.init(
//         {
//             name: {
//                 type: DataTypes.STRING,
//                 allowNull: false,
//             },
//         },
//         {
//             sequelize,
//             tableName: 'user',
//         }
//     )
//     return City;
// }



