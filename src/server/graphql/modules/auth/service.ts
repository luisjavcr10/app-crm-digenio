import { User } from "@/server/database/models";
import { encrypt } from "@/server/utils/session";
import dbConnect from "@/server/database/dbConnect";

export class AuthService{
    static async login(email:string, password:string){
        await dbConnect();
        const user = await User.findOne({email}).select("+password");
        console.log(user);
        if(!user || !(await user.comparePassword(password)) ){
            throw new Error('Credenciales inválidas');
        }

        const session = await encrypt({ userId: (user._id).toString() });

        return { user, session };
    }
}