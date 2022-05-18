import { APIGatewayProxyEvent } from "aws-lambda";
import { DataTypes } from 'sequelize'
import { Sequelize } from "sequelize/types";
import { apiResponse } from "src/common/api-response";
import { CityModel } from "./city.model";
import CityClass from './city.class'
import CityCode from "./cityCode.model";
import { closeConnection, loadSequelize, loadSequelizePromise } from "./postgresDb";
const User = require('../../../lib/database/models/user')
import db from './postgresDb-index';

// import * as User from '../../../lib/database/models/user';


export const main = async (_event: APIGatewayProxyEvent) => {
    console.log('getting postgres users');
    let seq = null;
    try {
        // seq = loadSequelize();
        // CityModel(seq);
        // (await loadSequelizePromise()).sync({ alter: { drop: false } })
        let cities = await CityClass.findAll({});
        return apiResponse._200({ cities })

    }
    finally {
        console.log('closing connection')
        await closeConnection();
    }
}

export const post = async (_event: APIGatewayProxyEvent) => {
    console.log('posting postgres users');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelize();
        CityModel(seq);

        await seq.model('City').create({ name: 'Kegalle', country: 'Sri Lanka', continent: 'Asia', code: 'lk' });
        return apiResponse._200({ message: "city added" })

    }
    catch (err) {
        console.error(err);
    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const getById = async (event: APIGatewayProxyEvent) => {
    console.log('getting postgres user by id');
    let seq: Sequelize = null;
    let id = event.pathParameters.id;
    try {
        seq = await loadSequelize();
        CityModel(seq);
        let cities = await seq.model('City').findByPk(id, {
            // attributes: ['name']
            attributes: { exclude: ['id'] },
            include: [{
                model: CityCode,
            }]
        });
        return apiResponse._200({ cities })

    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const getByName = async (event: APIGatewayProxyEvent) => {
    console.log('getting postgres user by id');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelize();
        CityModel(seq);
        let cities = await seq.model('City').findOne({ where: { name: 'Colombo' } })
        return apiResponse._200({ cities })

    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const deleteByName = async (event: APIGatewayProxyEvent) => {
    console.log('getting postgres user by id');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelize();
        CityModel(seq);
        await seq.model('City').destroy({ where: { name: 'Colombo' } })
        return apiResponse._200({ message: 'city deleted' })

    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const getCityCodes = async (_event: APIGatewayProxyEvent) => {
    console.log('getting postgres users');
    try {
        let city = await CityClass.findAll({})
        console.log(city)
        let cities = await CityCode.findAll({});
        return apiResponse._200({ cities })

    }
    finally {
        console.log('closing connection')
        await closeConnection();
    }
}

export const postCityCode = async (_event: APIGatewayProxyEvent) => {
    let seq: Sequelize = null;
    try {
        await CityCode.create({ name: 'KAN', CityClassId: 'a504fbb8-3720-4765-9f6c-0549c9829ba1' })
        return apiResponse._200({ message: "city added" })

    }
    catch (err) {
        console.error(err);
    }
    finally {
        console.log('closing connection')
        await closeConnection();
    }
}


export const addUser = async (_event: APIGatewayProxyEvent) => {
    let seq: Sequelize = null;
    try {
        seq = await loadSequelize();
        let user = { firstName: 'Janitha', lastName: "Tennakoon", email: 'aaaa' }
        let UserInstance = User(seq, DataTypes)
        await UserInstance.create(user);
        return apiResponse._200({ message: "user added" })

    }
    catch (err) {
        console.error(err);
    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const getUsers = async (_event: APIGatewayProxyEvent) => {
    let seq = null;
    try {
        seq = await loadSequelize();
        let UserInstance = User(seq, DataTypes)
        let users = await UserInstance.findAll({});
        return apiResponse._200({ users })

    }
    catch (err) {
        console.error(err);
    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

