"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DepartmentModel = void 0;
const mongoose_1 = require("mongoose");
const DepartmentSchema = new mongoose_1.Schema({
    name: String,
    depNumber: { type: Number, min: 1, max: 100 }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
DepartmentSchema.virtual('numUsers', {
    ref: 'User',
    localField: '_id',
    foreignField: 'department',
    count: true
});
exports.DepartmentModel = (0, mongoose_1.model)('Department', DepartmentSchema);
//# sourceMappingURL=department.model.js.map