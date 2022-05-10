"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbConnection = void 0;
const mongoose_1 = require("mongoose");
let conn = null;
const connectToDatabase = async (uri) => {
    if (conn === null && conn.ser) {
        console.log('Connecting to the database...');
        conn = (0, mongoose_1.connect)(uri, {
            serverSelectionTimeoutMS: 5000
        }).then(() => mongoose_1.default);
        await conn;
    }
    return conn;
};
exports.dbConnection = connectToDatabase;
//# sourceMappingURL=doConfig.js.map