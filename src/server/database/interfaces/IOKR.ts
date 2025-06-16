import { Document } from "mongoose";

export interface IOKR extends Document {
  title: string;
  description: string;
  owner: string;
  status: "Pending" | "In Progress" | "Completed";
  startDate: string;
  endDate: string;
  userId: string;
}