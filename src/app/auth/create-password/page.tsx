"use client";

import React from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@apollo/client";
import { PageTitle } from "@/client/components/private/auth/PageTitle";
import { CreatePasswordForm } from "@/client/components/private/auth/CreatePasswordForm";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { VALIDATE_PASSWORD_TOKEN } from "@/client/services/auth";
import { SearchParamsProps, ValidatePasswordTokenResponse } from "../types";

export default function CreatePasswordPage({ searchParams }: SearchParamsProps) {
  const resolvedSearchParams = React.use(searchParams);
  const token = resolvedSearchParams.token;
  const router = useRouter();
  
  const { data, loading, error } = useQuery<ValidatePasswordTokenResponse>(
    VALIDATE_PASSWORD_TOKEN,
    {
      variables: { token },
      skip: !token,
      errorPolicy: 'all',
    }
  );

  // Mostrar estado de carga
  if (loading) {
    return (
        <PageTitle 
          mainTitle="Validando token..." 
          description="" 
        />
    );
  }

  // Verificar si no hay token
  if (!token) {
    return (
      <>
        <PageTitle 
          mainTitle="Error" 
          description="Token no proporcionado" 
        />
        <p className="text-red-600 mt-4">
          No se ha proporcionado un token válido para crear la contraseña.
        </p>
        <MainButton text="Ir a login" handleClick={()=>router.push('/auth/login')}/>
      </>
    );
  }

  // Verificar si hay un error de GraphQL o el token es inválido
  if (error || (data && !data.validatePasswordToken.valid)) {
    const message = data?.validatePasswordToken.message || "Error al validar el token";
    
    return (
      <>
        <PageTitle 
          mainTitle="Error" 
          description="No se puede procesar la solicitud" 
        />
        <p className="text-red-600 mt-4">{message}</p>
        <MainButton text="Ir a login" handleClick={()=>router.push('/auth/login')}/>
      </>
    );
  }

  // Verificar si el token es válido
  if (data?.validatePasswordToken.valid) {
    return (
      <>
        <PageTitle 
          mainTitle="Crear contraseña" 
          description="Crea una contraseña para tu cuenta" 
        />
        <CreatePasswordForm token={token}/>
      </>
    );
  }

  // Estado por defecto mientras se resuelve la validación
  return (
      <PageTitle 
          mainTitle="Procesando..." 
          description="" 
        />
  );
}