import { UserRole } from "../Utilities/Enums/UserRole";

export interface IRegisterBody {
    role: UserRole;
    name: string;
    email: string;
    password: string;
    alias: string;
  }