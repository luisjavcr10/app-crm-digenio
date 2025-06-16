import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "USER";
  status: "active" | "inactive" | "on_leave";
  comparePassword(candidatePassword: string): Promise<boolean>;
}