import { DataTypes, Model } from "sequelize/types";

//many to many
export const UserModel = async (sequelize) => {
    const User: Model = sequelize.define('User', {
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