import { Document, Types } from "mongoose";

export interface IOKR extends Document {
  name: string;
  description: string;
  startups: Types.ObjectId[];
  status: "draft" | "pending" | "in_progress" | "completed";
  startDate: Date;
  endDate: Date;
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

export interface IOKRUpdate {
  name?: string;
  description?: string;
  status?: 'draft' | 'pending' | 'in_progress' | 'completed';
  startDate?: Date;
  endDate?: Date;
}