import { Document, Schema, model } from "mongoose";

const DepartmentSchema: Schema<IDepartmentDocument> = new Schema(
    {
        name: String,
        depNumber: { type: Number, min: 1, max: 100 }
    },
    {
        timestamps: true,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);



export interface Department {
    name: string,
    depNumber: number
}

interface IDepartmentDocument extends Department, Document {

}

DepartmentSchema.virtual('numUsers', {
    ref: 'User', // The model to use
    localField: '_id', // Find people where `localField`
    foreignField: 'department', // is equal to `foreignField`
    count: true // And only get the number of docs
});

export const DepartmentModel = model('Department', DepartmentSchema);