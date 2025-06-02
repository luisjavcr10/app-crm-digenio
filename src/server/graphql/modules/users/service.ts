import { User } from "../../models/User";
import dbConnect from "@/server/db/dbConnect";

interface User {
    email?: string;
    password?: string;
    firstName?: string;
    lastName?: string;
    role?: string;
}

export class AuthService{
    static async getUsers(){
        await dbConnect();
        return await User.find();
    }

    static async getUser(id: string){
        await dbConnect();
        return await User.findById(id);
    }

    static async createUser(email:string, password:string, firstName:string, lastName:string, role:string){
        await dbConnect();
        const newUser = new User({ email, password, firstName, lastName, role });
        return await newUser.save();
    }

    static async updateUser(id:string, {...updateData}: User){
        await dbConnect();
        return await User.findByIdAndUpdate(id, updateData, { new: true });
    }

    static async deleteUser(id:string){
        await dbConnect();
        return await User.findByIdAndDelete(id);
    }
}