import { Schema, model, Document } from "mongoose";

const UserSchema: Schema<IUserDocument> = new Schema(
    {
        userId: { type: String },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        address: {
            addressOne: String,
            addressTwo: { type: String },
            city: String,
            zipCode: Number
        }
    }, { timestamps: true }
);

UserSchema.methods.getFullName = function (this: IUserDocument) {
    return `${this?.firstName} ${this.lastName}`
}

UserSchema.virtual('getAddress').get(function (this: IUserDocument) {
    return `${this?.address.addressOne} ${this.address.addressTwo} , ${this.address.city}`
})

const UserModel = model('user', UserSchema);
export const user = UserModel;

export interface User {
    userId: String;
    firstName: String;
    lastName: String;
    address: Address
}

export interface Address {
    addressOne: string,
    addressTwo: string,
    city: string,
    zipCode: number
}

interface IUserDocument extends User, Document {
    getFullName(): string;
    getAddress(): string;
}