import { AuthService } from "./service";
import { cookies } from "next/headers";
import { COOKIE_NAME } from "@/server/utils/session";
import { getCurrentUser } from "@/server/utils/getCurrentUser";

export const authResolvers = {
  Mutation: {
    login: async (
      _: undefined,
      { email, password }: { email: string; password: string }
    ) => {
      const { user, session } = await AuthService.login(email, password);

      // Guardamos cookie segura
      const cookieStore = await cookies();
      cookieStore.set(COOKIE_NAME, session, {
        httpOnly: true,
        secure: true, //process.env.NODE_ENV === "production",
        sameSite: "strict",
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      });

      return user;
    },
    logout: async () => {
      const cookieStore = await cookies();
      cookieStore.delete(COOKIE_NAME);
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
