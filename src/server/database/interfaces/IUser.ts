import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: ("ADMIN" | "TEAMLEADER" | "EMPLOYEE")[]; 
  status: "pending" | "active" | "inactive" | "on_leave";
  passwordSetupToken:string;
  passwordSetupExpires:Date;
  resetPasswordToken:string;
  resetPasswordExpires: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}