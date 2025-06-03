import { AuthService } from "./service";

export const userResolvers = {
  Query: {
    users: async () => {
      return await AuthService.getUsers();
    },

    user: async (_: undefined, { id }: { id: string }) => {
      return await AuthService.getUser(id);
    },
  },

  Mutation: {
    createUser: async (
        _:undefined, 
        { email, password, firstName, lastName, role }:{email:string, password:string, firstName:string, lastName:string, role:string}) => {
      return AuthService.createUser(email, password, firstName, lastName, role);
    },

    updateUser: async (_:undefined, { id, ...updateData }:{id:string}) => {
      return await AuthService.updateUser(id, updateData);
    },

    deleteUser: async (_:undefined, { id }: { id: string }) => {
      return await AuthService.deleteUser(id);
    },
  },
};