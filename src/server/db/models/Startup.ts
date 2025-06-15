import { Schema, model, models, Document } from "mongoose";

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

const startupSchema = new Schema<IStartup>({
  client: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  responsible: {
    type: String,
    required: true,
  },
  monthlyMetric: {
    type: String,
    required: true,
  },
  metric: {
    type: String,
    required: true,
  },
  currentValue: {
    type: Number,
    required: true,
    default: 0, // Valor por defecto
  },
  expectedValue: {
    type: Number,
    required: true,
  },
});

// Evita recrear el modelo si ya existe
export const Startup = models.Startup || model<IStartup>("Startup", startupSchema);