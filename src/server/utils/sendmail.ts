import {transporter} from "./nodemailer";
import { APP_URL, SMTP_USER } from "../lib/config";

export async function sendPasswordSetupEmail(email: string, token: string) {
  const link = `${APP_URL}/auth/create-password?token=${token}`;
  const html = `
    <h1>Bienvenido</h1>
    <p>Para completar tu registro, haz clic en el siguiente enlace para crear tu contraseña:</p>
    <a href="${link}">Crear contraseña</a>
    <p>Este enlace expirará en 1 hora.</p>
  `;

  console.log(link);
  console.log(html);
  console.log(SMTP_USER);
  console.log(email);

  await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    subject: "Crea tu contraseña",
    html,
  });
}
