import crypto from "crypto";
import dbConnect from "@/server/database/dbConnect";
import { User } from "@/server/database/models/User";
import { IUser } from "@/server/database/interfaces/IUser";
import { sendResetPasswordEmail } from "@/server/utils/sendmail";

export class UserService {
  static async getUsers() {
    await dbConnect();
    return await User.find();
  }

  static async getUser(id: string) {
    await dbConnect();
    return await User.findById(id);
  }

  static async createUser(
    name: string,
    email: string,
    password: string,
    role?: "ADMIN" | "USER"
  ) {
    await dbConnect();
    const newUser = new User({ name, email, password, role });
    return await newUser.save();
  }

  static async updateUser(id: string, updateData: Partial<IUser>) {
    await dbConnect();
    return await User.findByIdAndUpdate(id, updateData, { new: true });
  }

  static async deleteUser(id: string) {
    await dbConnect();
    return await User.findByIdAndDelete(id);
  }

  static async validatePasswordToken(token: string) {
    await dbConnect();
    const user = await User.findOne({ passwordSetupToken: token });
    if (!user) {
      return {
        valid: false,
        message: "Token inválido o expirado",
        email: null,
      };
    }

    return { valid: true, email: user.email, message: "Token válido" };
  }

  static async validateResetPasswordToken(token: string) {
    await dbConnect();
    const user = await User.findOne({ resetPasswordToken: token });
    if (!user) {
      return {
        valid: false,
        message: "Token inválido o expirado",
        email: null,
      };
    }

    return { valid: true, email: user.email, message: "Token válido" };
  }

  static async comparePassword(user: IUser, candidatePassword: string) {
    return await user.comparePassword(candidatePassword);
  }

  static async setPasswordFromToken(token: string, password: string) {
    await dbConnect();
    const user = await User.findOne({ passwordSetupToken: token });
    if (!user) {
      return { success: false, message: "Token inválido o expirado" };
    }

    user.password = password;
    user.status = "active";
    user.passwordSetupToken = undefined;
    user.passwordSetupExpires = undefined;

    await user.save();

    return {
      success: true,
      message: "Contraseña creada con éxito. Ya puedes iniciar sesión.",
    };
  }

  static async requestPasswordReset(email: string) {
    await dbConnect();
    const user = await User.findOne({ email });

    if (!user) {
      return {
        success: true,
        message: "Si el correo está registrado, recibirás instrucciones.",
      };
    }

    const token = crypto.randomBytes(32).toString("hex");
    user.resetPasswordToken = token;
    user.resetPasswordExpires = new Date(Date.now() + 1000 * 60 * 60); // 1 hora

    await user.save();

    await sendResetPasswordEmail(user.email, token);

    return {
      success: true,
      message: "Si el correo está registrado, recibirás instrucciones.",
    };
  }

  static async resetPasswordWithToken(token: string, newPassword: string) {
    await dbConnect();
    const user = await User.findOne({ resetPasswordToken: token });

    if (!user) {
      return {
        success: false,
        message: "Token inválido o expirado.",
      };
    }

    user.password = newPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    return {
      success: true,
      message: "Contraseña actualizada. Ya puedes iniciar sesión.",
    };
  }
}
