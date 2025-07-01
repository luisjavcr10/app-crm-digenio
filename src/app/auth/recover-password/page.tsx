"use client";
import React from "react";
import { PageTitle } from "@/client/components/private/auth/PageTitle/PageTitle";
import { RecoverPasswordForm } from "@/client/components/private/auth/RecoverPassword";

export default function RecoverPasswordPage(){

  return(
    <>
      <PageTitle mainTitle="Recuperar contraseña" description="Ingresa tu correo electrónico para restablecer tu contraseña." />
      <RecoverPasswordForm />
    </>
  )
}