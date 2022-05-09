import { formatJSONResponse } from '@libs/api-gateway';
import { database } from './auroraDb';


export const getAuroraUsers = async () => {
    try {
        const query = `SELECT * FROM Persons`;
        const users = await database.query(query);
        return formatJSONResponse({ users });
    }
    catch (err) {
        return formatJSONResponse({ err });
    }
}