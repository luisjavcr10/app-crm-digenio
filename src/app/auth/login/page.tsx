import { LoginForm } from "@/client/components/private/auth/LoginForm";
import { PageTitle } from "@/client/components/private/auth/PageTitle/PageTitle";

export default function LoginPage() {
  return (
    <>
      <PageTitle mainTitle="Iniciar sesión" description="Por favor, ingresa tus credenciales."/>
      <LoginForm />
    </>
  );
}
