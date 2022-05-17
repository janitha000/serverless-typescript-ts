import { Sequelize } from 'sequelize';
let sequelize = null;
export const loadSequelize = async () => {
    if (!sequelize) {
        console.log('Connecting to postgreSQL');
        let sequelize = new Sequelize('postgres://postgres:mysecretpassword@example.com:5432/postgres', {
            pool: {
                max: 2,
                min: 0,
                idle: 0,
                acquire: 3000
            }
        });
        await sequelize.authenticate();
    }
    else {
        sequelize.connectionManager.initPools();
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
    }
    return sequelize;
};
//# sourceMappingURL=postgresDb.js.map