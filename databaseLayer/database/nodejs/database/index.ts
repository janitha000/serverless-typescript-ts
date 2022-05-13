import { user, User } from './models/user.model'
import { dbConnection } from './doConfig'

const DbCon = dbConnection;
const UserModel = user;

export {
    UserModel,
    DbCon,
    User
}