import { Schema, model, models, Document } from "mongoose";

export interface IOKR extends Document {
  title: string;
  description: string;
  owner: string;
  status: "Pending" | "In Progress" | "Completed";
  startDate: string;
  endDate: string;
  userId: string;
}

const okrSchema = new Schema<IOKR>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  owner: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending",
  },
  startDate: {
    type: String,
    required: true,
  },
  endDate: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
});

// Key solution: Check if model already exists before creating
export const OKR = models.OKR || model<IOKR>("OKR", okrSchema);
