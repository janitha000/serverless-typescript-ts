"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userId: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: {
        addressOne: String,
        addressTwo: { type: String },
        city: String,
        zipCode: Number
    }
}, { timestamps: true });
UserSchema.methods.getFullName = function () {
    return `${this?.firstName} ${this.lastName}`;
};
UserSchema.virtual('getAddress').get(function () {
    return `${this?.address.addressOne} ${this.address.addressTwo} , ${this.address.city}`;
});
const UserModel = (0, mongoose_1.model)('user', UserSchema);
exports.user = UserModel;
//# sourceMappingURL=user.model.js.map