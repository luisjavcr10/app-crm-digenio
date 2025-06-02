import { AuthService } from "./service";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/server/utils/session";
import { getCurrentUser } from "@/server/utils/getCurrentUser";
import { createSession, deleteSession } from "@/server/utils/session";

export const authResolvers = {
  Mutation: {
    login: async (
      _: undefined,
      { email, password }: { email: string; password: string }
    ) => {
      const { user, session } = await AuthService.login(email, password);

      // Guardamos cookie segura
      await createSession(session);

      return user;
    },
    logout: async () => {
      await deleteSession();
      return true;
    }
  },
  Query: {
    me: async () => {
      const user = await getCurrentUser();
      if(!user) throw new Error("No autenticado");
      return user;
    },
  },
};
