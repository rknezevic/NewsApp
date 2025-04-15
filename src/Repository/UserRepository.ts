import User from "../Model/User"
import { IUser } from "../Types/IUser";

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
}

export const createUser = async (userData : IUser) => {
    const user = new User(userData);
    return await user.save();
}