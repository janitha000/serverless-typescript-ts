import { Sequelize } from 'sequelize';
import { CityModel } from './city.model';

let sequelize: Sequelize = null;

export const loadSequelize = async (): Promise<Sequelize> => {
    console.log('getting connection')
    if (!sequelize) {
        console.log('Connecting to postgreSQL')
        // sequelize = new Sequelize('postgres://postgres:mysecretpassword@127.0.0.1:5432/postgres', {
        sequelize = new Sequelize('postgres://postgres:mysecretpassword@postgres1.cv3kkiohvgau.ap-southeast-1.rds.amazonaws.com:5432/postgres', {
            pool: {
                max: 2,
                min: 0,
                idle: 0,
                acquire: 3000
            }
        }) // Example for postgres
        await sequelize.authenticate();

    }
    else {
        console.log('getting connection from connection pool')
        sequelize.connectionManager.initPools();

        // restore `getConnection()` if it has been overwritten by `close()`
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
    }

    const models = {
        City: CityModel(sequelize, Sequelize)
    }
    //await sequelize.sync({ force: true });
    return sequelize;
}


