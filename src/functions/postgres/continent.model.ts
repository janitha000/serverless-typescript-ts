import { DataTypes, Model } from "sequelize/types";

//one to many
export const ContinentModel = async (sequelize) => {
    const User: Model = sequelize.define('Continent', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },

    }, {

    });


    return User;
}