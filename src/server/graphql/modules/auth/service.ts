import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { JWT_SECRET } from "@/server/lib/config";
import dbConnect from "@/server/db/dbConnect";

export class AuthService{
    static async login(email:string, password:string){
        await dbConnect();
        const user = await User.findOne({email}).select("+password");
        if(!user || !(await user.comparePassword(password)) ){
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1d'});
        return {token, user}
    }
}