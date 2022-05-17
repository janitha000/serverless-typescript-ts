import { user, User } from './models/user.model'
import { dbConnection } from './doConfig'
import { Department, DepartmentModel } from './models/department.model';

const DbCon = dbConnection;
const UserModel = user;

export {
    UserModel,
    DbCon,
    User,
    DepartmentModel,
    Department
}