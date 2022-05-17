import { Sequelize, DataTypes } from 'sequelize';
const sequelize = new Sequelize('sqlite::memory:');
export const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    country: {
        type: DataTypes.STRING
    }
}, {});
//# sourceMappingURL=city.model.js.map