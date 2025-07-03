import { Document, Types } from "mongoose";

export interface IEmployee extends Document {
  userId: Types.ObjectId;
  employeeId: string;
  position: string;
  skills: string[];
  contactInfo: {
    phone: string;
    emergencyContact: string;
  };
  status: "active" | "inactive" | "on_leave";
  hireDate?: Date;
  teams?: Types.ObjectId[];
}

export interface IEmployeeCounter extends Document {
  _id: string;
  seq: number;
}