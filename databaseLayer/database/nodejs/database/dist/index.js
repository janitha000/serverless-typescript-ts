"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DbCon = exports.UserModel = void 0;
const user_model_1 = require("./models/user.model");
const doConfig_1 = require("./doConfig");
const DbCon = doConfig_1.dbConnection;
exports.DbCon = DbCon;
const UserModel = user_model_1.user;
exports.UserModel = UserModel;
//# sourceMappingURL=index.js.map