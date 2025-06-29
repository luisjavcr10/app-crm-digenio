import { UserService } from "./service";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserService.getUsers();
    },
    user: async (_: undefined, { id }: { id: string }) => {
      return await UserService.getUser(id);
    },
    //validatePasswordToken: async (_: undefined, { token }: { token: string }) => {
    //  return await UserService.validatePasswordToken(token);
    //},
  },

  Mutation: {
    createUser: async (
      _: undefined, 
      { name, email, password, role }: 
      { name: string, email: string, password: string, role?: "ADMIN" | "USER" }
    ) => {
      return await UserService.createUser(name, email, password, role);
    },

    updateUser: async (
      _: undefined, 
      { id, ...updateData }: 
      { id: string } & Partial<{
        name: string,
        email: string,
        password: string,
        role: "ADMIN" | "USER",
        status: "pending" | "active" | "inactive" | "on_leave"
      }>
    ) => {
      return await UserService.updateUser(id, updateData);
    },

    deleteUser: async (_: undefined, { id }: { id: string }) => {
      return await UserService.deleteUser(id);
    },
  },
};