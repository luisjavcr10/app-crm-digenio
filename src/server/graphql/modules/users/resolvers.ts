import { UserService } from "./service";

export const userResolvers = {
  Query: {
    users: async () => {
      return await UserService.getUsers();
    },
    user: async (_: undefined, { id }: { id: string }) => {
      return await UserService.getUser(id);
    },
    validatePasswordToken: async (_: undefined, { token }: { token: string }) => {
      return await UserService.validatePasswordToken(token);
    },
    validateResetPasswordToken: async (_: undefined, { token }: { token: string }) => {
      return await UserService.validateResetPasswordToken(token);
    },
  },

  Mutation: {
    createUser: async (
      _: undefined, 
      { name, email, password, role }: 
      { name: string, email: string, password: string, role: ("ADMIN" | "TEAMLEADER" | "EMPLOYEE")[] }
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
        role: ("ADMIN" | "TEAMLEADER" | "EMPLOYEE")[]
        status: "pending" | "active" | "inactive" | "on_leave"
      }>
    ) => {
      return await UserService.updateUser(id, updateData);
    },

    deleteUser: async (_: undefined, { id }: { id: string }) => {
      return await UserService.deleteUser(id);
    },

    setPasswordFromToken: async (_: undefined, { token, password }: { token: string, password: string }) => {
      return await UserService.setPasswordFromToken(token, password);
    },

    requestPasswordReset: async (_: undefined, { email }: { email: string }) => {
      return await UserService.requestPasswordReset(email);
    },

    resetPasswordWithToken: async (_: undefined, { token, newPassword }: { token: string, newPassword: string }) => {
      return await UserService.resetPasswordWithToken(token, newPassword);
    },
  },
};