import { PageTitle } from "@/client/components/private/auth/PageTitle/PageTitle"
import { CreatePasswordForm } from "@/client/components/private/auth/CreatePasswordForm/CreatePasswordForm"

export default function CreatePasswordPage(){
  return(
    <>
      <PageTitle mainTitle="Crear contraseña" description="Crea una contraseña para tu cuenta"/>
      <CreatePasswordForm />
    </>
  )
}