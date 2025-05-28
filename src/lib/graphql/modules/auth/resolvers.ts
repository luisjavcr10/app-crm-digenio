import { AuthService } from "./service";

export const authResolvers = {
  Mutation: {
    login: async (_:any, {email,password}:{email:string, password:string})=>{
        return await AuthService.login(email,password);
    }
  }
}