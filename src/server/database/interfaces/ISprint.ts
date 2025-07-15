import { Document, Types } from "mongoose";

/**
 * Interface para los módulos dentro de cada sprint
 */
export interface IModule {
  name: string;
  task: string;
  responsible: Types.ObjectId; // ID del empleado responsable
  status: "pending" | "in_progress" | "completed" | "blocked";
  deadline: Date;
}

/**
 * Interface para los sprints de una startup
 */
export interface ISprint {
  orderNumber: number;
  name: string;
  deliverable?: string; // Se agrega cuando pasa a "in_progress"
  startDate?: Date; // Se agrega cuando pasa a "in_progress"
  endDate?: Date; // Se agrega cuando pasa a "in_progress"
  status: "planned" | "in_progress" | "completed" | "delayed";
  modules: IModule[];
}

/**
 * Document interface para Sprint (si necesitamos guardarlo como documento separado)
 */
export interface ISprintDocument extends Document, ISprint {
  startupId: Types.ObjectId;
}