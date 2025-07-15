import { Schema, model, models } from "mongoose";
import { IEmployee, IEmployeeCounter } from "../interfaces/IEmployee";

const counterSchema = new Schema<IEmployeeCounter>(
  {
    _id: { type: String, required: true },
    seq: { type: Number, default: 0 },
  },
  { _id: true }
);

const Counter = models.Counter || model<IEmployeeCounter>("Counter", counterSchema);

const employeeSchema = new Schema<IEmployee>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
      index: true,
    },
    employeeId: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      type: String,
      required: true,
    },
    skills: {
      type: [String],
      required: true,
      default: [],
    },
    contactInfo: {
      phone: {
        type: String,
        required: true,
      },
      emergencyContact: {
        type: String,
        required: true,
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "on_leave"],
      default: "active",
    },
    hireDate: {
      type: Date,
      default: Date.now,
    },
    teams: {
      type: [Schema.Types.ObjectId],
      ref: "Team",
      default: [],
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

employeeSchema.virtual("userInfo", {
  ref: "User",
  localField: "userId",
  foreignField: "_id",
  justOne: true,
});

employeeSchema.virtual("teamsInfo", {
  ref: "Team",
  localField: "teams",
  foreignField: "_id",
  justOne: false,
})

employeeSchema.pre<IEmployee>("validate", async function (next) {
  if (this.isNew && !this.employeeId) {
    try {
      const counter = await Counter.findOneAndUpdate(
        { _id: "employeeId" }, // Buscar por _id string
        { $inc: { seq: 1 } },
        { new: true, upsert: true }
      ).exec();

      this.employeeId = `EMP-${counter.seq}`;
      next();
    } catch (error: unknown) {
      next(
        error instanceof Error
          ? error
          : new Error("Error al generar ID secuencial")
      );
    }
  } else {
    next();
  }
});

export const Employee =
  models.Employee || model<IEmployee>("Employee", employeeSchema);
