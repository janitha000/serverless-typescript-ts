import { Schema, model, Model } from "mongoose";

const UserSchema: Schema<User, UserModel, IUserMethods> = new Schema(
    {
        userId: { type: String },
        firstName: { type: String, required: true, maxlength: 100 },
        lastName: { type: String, required: true },
        address: {
            addressOne: String,
            addressTwo: { type: String },
            city: String,
            zipCode: Number
        },
        department: { type: Schema.Types.ObjectId, ref: 'Department' }
    }, { timestamps: true }
);

UserSchema.methods.getFullName = function (this: User) {
    return `${this?.firstName} ${this.lastName}`
}

UserSchema.virtual('getAddress').get(function (this: User) {
    return `${this?.address.addressOne} ${this.address.addressTwo} , ${this.address.city}`
})

const UserModel = model('User', UserSchema);
export const user = UserModel;

export interface User {
    userId: String;
    firstName: String;
    lastName: String;
    address: Address;
    department: string;

}

export interface Address {
    addressOne: string,
    addressTwo: string,
    city: string,
    zipCode: number,
    getFullName(): string;
}

interface IUserMethods {
    getFullName(): string;
    getAddress(): string;
}

type UserModel = Model<User, {}, IUserMethods>;
