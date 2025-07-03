import { Schema, model, models } from "mongoose";
import { IUser } from "../interfaces/IUser";
import bcrypt from "bcryptjs";

const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false,
    },
    role: {
      type: [String],
      enum: ["ADMIN", "TEAMLEADER", "EMPLOYEE"],
      required:true
    },
    status: {
      type: String,
      enum: ["pending", "active", "inactive", "on_leave"],
      default: "pending",
    },
    passwordSetupToken: {
      type: String,
      required: false,
    },
    passwordSetupExpires: {
      type: Date,
      required: false,
    },
    resetPasswordToken: {
      type: String,
      required: false,
    },
    resetPasswordExpires: {
      type: Date,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

// Middleware para hash de contraseña
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  next();
});

// Método para comparar contraseñas
userSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  return await bcrypt.compare(candidatePassword, this.password);
};

// Solución clave: Verifica si el modelo ya existe antes de crearlo
export const User = models.User || model<IUser>("User", userSchema);
