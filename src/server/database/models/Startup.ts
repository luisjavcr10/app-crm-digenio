import { Schema, model, models } from "mongoose";
import { IStartup, StartupStatus } from "../interfaces/IStartup";
import { IModule, ISprint } from "../interfaces/ISprint";

/**
 * Schema para los módulos dentro de cada sprint
 */
const moduleSchema = new Schema<IModule>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "El nombre del módulo no puede exceder los 100 caracteres"]
  },
  task: {
    type: String,
    required: true,
    trim: true,
    maxlength: [500, "La tarea no puede exceder los 500 caracteres"]
  },
  responsible: {
    type: Schema.Types.ObjectId,
    ref: "Employee",
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "in_progress", "completed", "blocked"],
    default: "pending"
  },
  deadline: {
    type: Date,
    required: true
  }
}, { _id: false });

/**
 * Schema para los sprints de una startup
 */
const sprintSchema = new Schema<ISprint>({
  orderNumber: {
    type: Number,
    required: true,
    min: 1
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "El nombre del sprint no puede exceder los 100 caracteres"]
  },
  deliverable: {
    type: String,
    trim: true,
    maxlength: [500, "El entregable no puede exceder los 500 caracteres"]
  },
  startDate: {
    type: Date
  },
  endDate: {
    type: Date,
    validate: {
      validator: function(this: ISprint, value: Date) {
        return !this.startDate || !value || this.startDate <= value;
      },
      message: "La fecha de fin debe ser posterior a la fecha de inicio"
    }
  },
  status: {
    type: String,
    enum: ["planned", "in_progress", "completed", "delayed"],
    default: "planned"
  },
  modules: {
    type: [moduleSchema],
    default: []
  }
}, { _id: false });

/**
 * Schema principal para Startup
 */
const startupSchema = new Schema<IStartup>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "El nombre no puede exceder los 100 caracteres"]
  },
  description: {
    type: String,
    required: true,
    trim: true,
    maxlength: [1000, "La descripción no puede exceder los 1000 caracteres"]
  },
  okrId: {
    type: Schema.Types.ObjectId,
    ref: "OKR",
    required: true,
    index: true
  },
  teamId: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
    index: true
  },
  status: {
    type: String,
    enum: ["idea_pending_review", "idea_observed", "idea_rejected", "in_progress", "completed", "paused"] as StartupStatus[],
    default: "idea_pending_review"
  },
  observation: {
    type: String,
    trim: true,
    maxlength: [1000, "La observación no puede exceder los 1000 caracteres"]
  },
  sprints: {
    type: [sprintSchema],
    default: []
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para información del OKR
startupSchema.virtual('okrInfo', {
  ref: 'OKR',
  localField: 'okrId',
  foreignField: '_id',
  justOne: true
});

// Virtual para información del equipo
startupSchema.virtual('teamInfo', {
  ref: 'Team',
  localField: 'teamId',
  foreignField: '_id',
  justOne: true
});

// Middleware para validar que la observación solo existe cuando el estado es "idea_observed"
startupSchema.pre('save', function(next) {
  if (this.status !== 'idea_observed' && this.observation) {
    this.observation = undefined;
  }
  if (this.status === 'idea_observed' && !this.observation) {
    return next(new Error('Se requiere una observación cuando el estado es "idea_observed"'));
  }
  next();
});

// Evita recrear el modelo si ya existe
export const Startup = models.Startup || model<IStartup>("Startup", startupSchema);