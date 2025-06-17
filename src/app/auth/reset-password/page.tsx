import { PageTitle } from "@/client/components/private/auth/PageTitle/PageTitle"
import { ResetPasswordForm } from "@/client/components/private/auth/ResetPasswordForm"

export default function ResetPasswordPage(){
  return(
    <>
      <PageTitle mainTitle="Crear nueva contraseña" description="Crea una nueva contraseña para tu cuenta."/>
      <ResetPasswordForm />
    </>
  )
}