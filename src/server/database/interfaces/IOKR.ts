import { Document, Types } from "mongoose";

export interface IOKR extends Document {
  title: string;
  description: string;
  owner: Types.ObjectId;
  status: "draft" | "pending" | "in_progress" | "completed";
  startDate: Date;
  endDate: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}