import { Schema, model, models } from "mongoose";
import { IOKR } from "../interfaces/IOKR";

const okrSchema = new Schema<IOKR>({
  title: {
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
  owner: {
    type: Schema.Types.ObjectId,
    ref: "Team",
    required: true,
    index:true
  },
  status: {
    type: String,
    enum: ["draft","pending", "in_progress", "completed"],
    default: "draft"
  },
  startDate: {
    type: Date,
    required: true,
    validate: {
      validator: function(this: IOKR, value: Date) {
        return !this.endDate || value <= this.endDate;
      },
      message: "La fecha de inicio debe ser anterior a la fecha de fin"
    }
  },
  endDate: {
    type: Date,
    required: true,
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

// Virtual para información del equipo (owner)
okrSchema.virtual('ownerInfo', {
  ref: 'Team',
  localField: 'owner',
  foreignField: '_id',
  justOne: true,
});

// Virtual para información del creador
okrSchema.virtual('creatorInfo', {
  ref: 'User',
  localField: 'createdBy',
  foreignField: '_id',
  justOne: true
});

export const OKR = models.OKR || model<IOKR>("OKR", okrSchema);
