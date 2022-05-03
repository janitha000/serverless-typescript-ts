import { Schema, model } from "mongoose";
const UserSchema = new Schema({
    userId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
}, { timestamps: true });
const UserModel = model('user', UserSchema);
export const user = UserModel;
//# sourceMappingURL=user.model.js.map