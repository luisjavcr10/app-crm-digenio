import { AuthService } from "./service";

export const authResolvers = {
  Mutation: {
    login: async (_:undefined, {email,password}:{email:string, password:string})=>{
        return await AuthService.login(email,password);
    }
  }
}