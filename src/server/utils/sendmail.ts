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

  await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    subject: "Crea tu contraseña",
    html,
  });
}

export async function sendResetPasswordEmail(email: string, token: string) {
  const link = `${APP_URL}/auth/reset-password?token=${token}`;
  const html = `
    <h1>Hola de nuevo</h1>
    <p>Para recuperar tu contraseña, haz clic en el siguiente enlace:</p>
    <a href="${link}">Crear contraseña</a>
    <p>Este enlace expirará en 1 hora.</p>
  `;

  await transporter.sendMail({
    from: SMTP_USER,
    to: email,
    subject: "Recupera tu contraseña",
    html,
  });
}
