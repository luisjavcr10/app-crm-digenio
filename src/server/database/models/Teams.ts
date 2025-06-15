import { Schema, model, models, Document, Types } from "mongoose";

export interface ITeam extends Document {
  name: string;
  description: string;
  manager: Types.ObjectId;
  members: Types.ObjectId[];
  status: "active" | "inactive" | "archived";
  createdAt: Date;
  updatedAt: Date;
}

export const teamSchema = new Schema<ITeam>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      maxlength: [100, "El nombre no puede exceder los 100 caracteres"],
    },
    description: {
      type: String,
      trim: true,
      maxlength: [500, "La descripción no puede exceder los 500 caracteres"],
    },
    manager: {
      type: Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
      validate: {
        validator: async (value: Types.ObjectId) => {
          const employee = await models.Employee.findById(value);
          return employee !== null;
        },
        message: "El empleado manager especificado no existe",
      },
    },
    members: {
      type: [Schema.Types.ObjectId],
      ref: "Employee",
      default: [],
      validate: {
        validator: async (values: Types.ObjectId[]) => {
          const employees = await models.Employee.find({ _id: { $in: values } });
          return employees.length === values.length;
        },
        message: "Uno o más empleados miembros no existen",
      },
    },
    status: {
      type: String,
      enum: ["active", "inactive", "archived"],
      default: "active",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
)

// Virtual para obtener la información del manager poblada
teamSchema.virtual("managerInfo", {
  ref: "Employee",
  localField: "manager",
  foreignField: "_id",
  justOne: true,
});

// Virtual para obtener la información de los miembros poblada
teamSchema.virtual("membersInfo", {
  ref: "Employee",
  localField: "members",
  foreignField: "_id",
});

// Middleware para validar que el manager está incluido en los miembros
teamSchema.pre("save", async function (next) {
  if (this.isModified("members") || this.isModified("manager")) {
    if (!this.members.includes(this.manager)) {
      this.members.push(this.manager);
    }
  }
  next();
});

export const Team = models.Team || model<ITeam>("Team", teamSchema);