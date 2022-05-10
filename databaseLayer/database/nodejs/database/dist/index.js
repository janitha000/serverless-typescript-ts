"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.DbCon = void 0;
const user_model_1 = require("./models/user.model");
const doConfig_1 = require("./doConfig");
exports.DbCon = doConfig_1.dbConnection;
exports.UserModel = user_model_1.user;
//# sourceMappingURL=index.js.map