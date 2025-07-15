import { Document, Types } from "mongoose";
import { ISprint } from "./ISprint";

/**
 * Estados posibles para una startup
 */
export type StartupStatus = 
  | "idea_pending_review" // Idea por revisar
  | "idea_observed" // Idea observada (requiere comentario)
  | "idea_rejected" // Idea rechazada
  | "in_progress" // En proceso (después de ser aceptada)
  | "completed" // Completada
  | "paused"; // Pausada

/**
 * Interface para el modelo Startup actualizado
 */
export interface IStartup extends Document {
  name: string;
  description: string;
  okrId: Types.ObjectId; // ID del OKR relacionado
  teamId: Types.ObjectId; // ID del equipo responsable
  status: StartupStatus;
  observation?: string; // Comentario del admin cuando está en estado "idea_observed"
  sprints: ISprint[]; // Lista de sprints
  createdAt: Date;
  updatedAt: Date;
}