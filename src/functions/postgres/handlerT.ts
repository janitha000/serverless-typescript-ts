import { APIGatewayProxyEvent } from "aws-lambda";
import { Sequelize } from "sequelize-typescript";
import { apiResponse } from "src/common/api-response";
import { City } from "./city-typescripte.model";
import { Country } from "./country-typescipt";
import { People } from "./people-typescipt.model";
import { loadSequelizeT } from "./postgresDb-typescript";

export const getCities = async (_event: APIGatewayProxyEvent) => {
    console.log('getting postgres users');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelizeT();
        console.log('connected to seq');
        seq.addModels([City])
        let cities = await City.findAll({});
        return apiResponse._200({ cities })

    }
    catch (err) {
        console.error(err)
    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const postT = async (_event: APIGatewayProxyEvent) => {
    console.log('posting postgres users');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelizeT();
        seq.addModels([City])

        await City.create({ name: 'Kegalle', country: 'Sri Lanka', continent: 'Asia', code: 'lk', countryId: "75b63880-4b42-43b6-b657-0443972ed19a" });
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

export const getCountries = async (_event: APIGatewayProxyEvent) => {
    console.log('getting postgres users');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelizeT();
        console.log('connected to seq');
        let cities = await Country.findAll({
            include: [City]
        });
        return apiResponse._200({ cities })

    }
    catch (err) {
        console.error(err)
    }
    finally {
        console.log('closing connection')
        await seq.connectionManager.close();
    }
}

export const postCountryT = async (_event: APIGatewayProxyEvent) => {
    console.log('posting postgres users');
    let seq: Sequelize = null;
    try {
        seq = await loadSequelizeT();
        await Country.create({ name: 'SL' });
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

export const AddCityAndPeople = async () => {
    let seq: Sequelize = await loadSequelizeT();;
    let city = new City({ name: 'Galle', country: 'Sri Lanka', continent: 'Asia', code: 'lk', countryId: "75b63880-4b42-43b6-b657-0443972ed19a" })
    await city.save();

    let person = new People({ name: 'Vindya' });
    await person.save();

    await city.$set('peoples', person);
    return apiResponse._200({ message: "city and people added" })
}

export const getCityAndPeople = async () => {
    await loadSequelizeT();;
    let cities = await City.findAll({ where: { 'name': 'Galle' }, include: [People] },)
    return apiResponse._200({ cities })
}