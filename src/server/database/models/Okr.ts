import { Schema, model, models, Document } from "mongoose";
import { IOKR } from "../interfaces/IOKR";

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

export const OKR = models.OKR || model<IOKR>("OKR", okrSchema);
