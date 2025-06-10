import { Document } from "mongoose";
import { IStartup } from "../../models/Startup"; // Ajusta la ruta

// Input para creación
export interface CreateStartupInput
  extends Omit<IStartup, keyof Document | "currentValue"> {
  currentValue?: number;
}

// Input para actualización (todos los campos opcionales)
export interface UpdateStartupInput
  extends Partial<Omit<IStartup, keyof Document>> {}

// Input específico para métricas
export interface UpdateMetricsInput {
  id: string;
  currentValue: number;
}