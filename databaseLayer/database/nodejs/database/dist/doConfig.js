import mongoose, { connect } from "mongoose";
let conn = null;
const connectToDatabase = async (uri) => {
    if (conn === null) {
        console.log('Connecting to the database...');
        conn = connect(uri, {
            serverSelectionTimeoutMS: 5000
        }).then(() => mongoose);
        await conn;
    }
    return conn;
};
export const dbConnection = connectToDatabase;
//# sourceMappingURL=doConfig.js.map