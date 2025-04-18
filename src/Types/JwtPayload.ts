import { UserRole } from "../Utilities/Enums/UserRole";

export interface JwtPayload {
    id: string,
    role: UserRole
};