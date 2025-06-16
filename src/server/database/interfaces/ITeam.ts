import { Document, Types } from "mongoose";

export interface ITeam extends Document {
  name: string;
  description: string;
  manager: Types.ObjectId;
  members: Types.ObjectId[];
  status: "active" | "inactive" | "archived";
  createdAt: Date;
  updatedAt: Date;
}