import { Sequelize } from 'sequelize';
import { CityClass } from './city.model'

let sequelize: Sequelize = null;

export const loadSequelize = async (): Promise<Sequelize> => {
    console.log('getting connection')
    if (!sequelize) {
        console.log('Connecting to postgreSQL')
        sequelize = new Sequelize('postgres://postgres:mysecretpassword@127.0.0.1:5432/postgres', {
            // sequelize = new Sequelize('postgres://postgres:mysecretpassword@postgres1.cv3kkiohvgau.ap-southeast-1.rds.amazonaws.com:5432/postgres', {
            pool: {
                max: 2,
                min: 0,
                idle: 0,
                acquire: 3000
            }
        }) // Example for postgres
        console.log('authenticating')
        await sequelize.authenticate();

    }
    else {
        console.log('getting connection from connection pool')
        sequelize.connectionManager.initPools();

        // restore `getConnection()` if it has been overwritten by `close()`
        if (sequelize.connectionManager.hasOwnProperty("getConnection")) {
            delete sequelize.connectionManager.getConnection;
        }
        return sequelize;

    }

    // const models = {
    //     City: CityModel(sequelize, Sequelize)
    // }

    // CityModel(sequelize)
    //await sequelize.sync({ alter: { drop: false } });

}

export const connection = () => {
    return loadSequelize().then(val => {
        return val;
    })
}

export const loadSequelizePromise = (): Sequelize => {
    console.log('getting connection')
    if (!sequelize) {
        console.log('Connecting to postgreSQL')
        sequelize = new Sequelize('postgres://postgres:mysecretpassword@127.0.0.1:5432/postgres', {
            // sequelize = new Sequelize('postgres://postgres:mysecretpassword@postgres1.cv3kkiohvgau.ap-southeast-1.rds.amazonaws.com:5432/postgres', {
            pool: {
                max: 2,
                min: 0,
                idle: 0,
                acquire: 3000
            }
        }) // Example for postgres
        // sequelize.authenticate().then(() => {
        //     console.log('connected to db')
        //     return sequelize;
        // })

        Object.keys(sequelize).forEach(modelName => {
            if (sequelize[modelName].associate) {
                sequelize[modelName].associate(sequelize);
            }
        });

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
    //await sequelize.sync({ alter: { drop: false } });
    return sequelize;
}

export const closeConnection = async () => {
    console.log('closing connection')
    await sequelize.connectionManager.close();
}

