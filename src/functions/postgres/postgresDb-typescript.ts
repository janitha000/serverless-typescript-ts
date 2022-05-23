import { Sequelize } from 'sequelize-typescript';
import { City } from './city-typescripte.model';
import { Country } from './country-typescipt';
import { People, PeopleCity } from './people-typescipt.model';

let sequelize: Sequelize = null;
const CURRENT_LAMBDA_FUNCTION_TIMEOUT = 60 * 60

export const loadSequelizeT = async (): Promise<Sequelize> => {
    console.log('getting connection')
    if (!sequelize) {
        console.log('Connecting to postgreSQL')
        sequelize = new Sequelize('postgres://postgres:mysecretpassword@127.0.0.1:5432/postgres', {
            // sequelize = new Sequelize('postgres://postgres:mysecretpassword@postgres1.cv3kkiohvgau.ap-southeast-1.rds.amazonaws.com:5432/postgres', {
            pool: {
                max: 2,
                min: 0,
                idle: 0,
                acquire: 3000,
                evict: CURRENT_LAMBDA_FUNCTION_TIMEOUT
            }
        }) // Example for postgres
        // console.log('authenticating')
        //await sequelize.authenticate();

    }
    else {
        console.log('getting connection from connection pool')
        sequelize.connectionManager.initPools();

        // restore `getConnection()` if it has been overwritten by `close()`
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }

    }

    // const models = {
    //     City: CityModel(sequelize, Sequelize)
    // }

    // CityModel(sequelize)
    //console.log(sequelize)
    sequelize.addModels([Country, City, People, PeopleCity])
    //await sequelize.sync({ alter: { drop: false } });
    //    await sequelize.sync({ force: true });

    return sequelize;


}

