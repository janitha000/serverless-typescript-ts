"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.user = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    userId: { type: String },
    firstName: { type: String },
    lastName: { type: String },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)('user', UserSchema);
exports.user = UserModel;
//# sourceMappingURL=user.model.js.map