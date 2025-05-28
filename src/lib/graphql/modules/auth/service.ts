import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { JWT_SECRET } from "app/config";
import dbConnect from "app/lib/db/dbConnect";

export class AuthService{
    static async login(email:string, password:string){
        await dbConnect();
        const user = await User.findOne({email}).select("+password");
        console.log(user);
        //solucionar problema con || !(await user.comparePassword(password)) 
        //parece ser que no valida conrrectamente el password
        if(!user || !(await user.comparePassword(password)) ){
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1d'});
        return {token, user}
    }
}