"use client";

import React from "react";
import { PageTitle } from "@/client/components/private/auth/PageTitle/PageTitle";
import { CreatePasswordForm } from "@/client/components/private/auth/CreatePasswordForm/CreatePasswordForm";
import { useQuery } from "@apollo/client";
import { VALIDATE_PASSWORD_TOKEN } from "@/client/services/auth";

interface CreatePasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

interface ValidatePasswordTokenResponse {
  validatePasswordToken: {
    email: string | null;
    message: string;
    valid: boolean;
  };
}

export default function CreatePasswordPage({ searchParams }: CreatePasswordPageProps) {
  const resolvedSearchParams = React.use(searchParams);
  const token = resolvedSearchParams.token;
  
  const { data, loading, error } = useQuery<ValidatePasswordTokenResponse>(
    VALIDATE_PASSWORD_TOKEN,
    {
      variables: { token },
      skip: !token,
      errorPolicy: 'all', // Permite recibir datos parciales incluso con errores
    }
  );

  // Mostrar estado de carga
  if (loading) {
    return (
      <>
        <PageTitle 
          mainTitle="Validando token..." 
          description="" 
        />
      </>
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
    <>
      <PageTitle 
          mainTitle="Procesando..." 
          description="" 
        />
    </>
  );
}