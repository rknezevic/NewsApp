export interface IUserAuth {
    id: string;
    email: string;
    role: "admin" | "editor" | "guest";
    name: string;
  }
  