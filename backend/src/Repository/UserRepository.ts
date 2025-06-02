import { ObjectId } from "mongoose";
import User from "../Model/User"
import { IUser } from "../Model/User";

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
}

export const createUser = async (userData : IUser) => {
    const user = new User(userData);
    return await user.save();
}

export const findUserById = async (id: string) => {
    return await User.findById(id);
}