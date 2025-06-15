"server-only";
import { cookies } from "next/headers";
import { COOKIE_NAME, decrypt} from '../utils/session'
import dbConnect from "../database/dbConnect";
import { User } from "../database/models/User";

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get(COOKIE_NAME)?.value;

  if (!session) return null;

  const payload = await decrypt(session);
  if (!payload?.userId) return null;

  await dbConnect();
  const user = await User.findById(payload.userId);
  return user;
}
