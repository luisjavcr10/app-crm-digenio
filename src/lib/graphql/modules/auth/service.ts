import jwt from "jsonwebtoken";
import { User } from "../../models/User";
import { JWT_SECRET } from "app/config";

export class AuthService{
    static async login(email:string, password:string){
        const user = await User.findOne({email}).select("+password");
        if(!user || !(await user.comparePassword(password))){
            throw new Error('Credenciales inválidas');
        }
        const token = jwt.sign({id: user._id}, JWT_SECRET, {expiresIn: '1d'});
        return {token, user}
    }
}