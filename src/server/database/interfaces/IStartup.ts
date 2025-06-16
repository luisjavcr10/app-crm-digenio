import { Document } from "mongoose";

export interface IStartup extends Document {
  client: string;
  name: string;
  description: string;
  responsible: string;
  monthlyMetric: string;
  metric: string;
  currentValue: number;
  expectedValue: number;
}