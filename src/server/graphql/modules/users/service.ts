import { User } from "@/server/database/models/User";
import dbConnect from "@/server/database/dbConnect";
import { IUser } from "@/server/database/interfaces/IUser";

export class UserService {
    static async getUsers() {
        await dbConnect();
        return await User.find();
    }

    static async getUser(id: string) {
        await dbConnect();
        return await User.findById(id);
    }

    static async createUser(name: string, email: string, password: string, role?: "ADMIN" | "USER") {
        await dbConnect();
        const newUser = new User({ name, email, password, role });
        return await newUser.save();
    }

    static async validatePasswordToken(token: string) {
        await dbConnect();
        const user = await User.findOne({ passwordSetupToken: token});
        if (!user) {
            return false;
        }
        if (!user) {
            return { valid: false, message: "Token inválido o expirado", email: null };
        }

        return { valid: true, email: user.email, message: "Token válido" };
    }

    static async updateUser(id: string, updateData: Partial<IUser>) {
        await dbConnect();
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async deleteUser(id: string) {
        await dbConnect();
        return await User.findByIdAndDelete(id);
    }

    static async comparePassword(user: IUser, candidatePassword: string) {
        return await user.comparePassword(candidatePassword);
    }
}