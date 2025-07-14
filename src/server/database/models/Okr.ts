import { Schema, model, models } from "mongoose";
import { IOKR } from "../interfaces/IOKR";

const okrSchema = new Schema<IOKR>({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, "El título no puede exceder los 100 caracteres"]
  },
  description: {
    type: String,
    required: true,
    trim:true
  },
  startups: {
    type: [Schema.Types.ObjectId],
    ref: "Startup",
    required: false,
    index:true,
    default: []
  },
  status: {
    type: String,
    enum: ["draft","pending", "in_progress", "completed"],
    required:true
  },
  startDate: {
    type: Date,
    required: false,
    validate: {
      validator: function(this: IOKR, value: Date) {
        return !this.endDate || value <= this.endDate;
      },
      message: "La fecha de inicio debe ser anterior a la fecha de fin"
    }
  },
  endDate: {
    type: Date,
    required: false,
  },
  createdBy: {
    type: Schema.Types.ObjectId,
    ref:"User",
    required: true,
  },
},{
  timestamps:true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Virtual para información de las startups
okrSchema.virtual('startupsInfo', {
  ref: 'Startup',
  localField: 'startups',
  foreignField: '_id',
  justOne: false
});

// Virtual para información del creador
okrSchema.virtual('creatorInfo', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
});

export const OKR = models.OKR || model<IOKR>("OKR", okrSchema);
