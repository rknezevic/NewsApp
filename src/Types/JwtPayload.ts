import { UserRole } from "../Utilities/Enums/UserRole";

export interface JwtPayload {
    name: string,
    id: string,
    role: UserRole
};