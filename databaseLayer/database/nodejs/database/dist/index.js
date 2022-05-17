"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = exports.DbCon = exports.UserModel = void 0;
const user_model_1 = require("./models/user.model");
const doConfig_1 = require("./doConfig");
const department_model_1 = require("./models/department.model");
Object.defineProperty(exports, "DepartmentModel", { enumerable: true, get: function () { return department_model_1.DepartmentModel; } });
const DbCon = doConfig_1.dbConnection;
exports.DbCon = DbCon;
const UserModel = user_model_1.user;
exports.UserModel = UserModel;
//# sourceMappingURL=index.js.map