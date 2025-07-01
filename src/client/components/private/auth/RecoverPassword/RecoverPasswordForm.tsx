"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useMutation } from "@apollo/client";
import { REQUEST_PASSWORD_RESET } from "@/client/services/auth";

export const RecoverPasswordForm = () => {
  const [requestPasswordReset, { loading }] = useMutation(REQUEST_PASSWORD_RESET);
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError("Todos los campos son obligatorios");
      return;
    }
    
    setError("");
    
    try {
      const { data } = await requestPasswordReset({
        variables: { email }
      });

      if (data?.requestPasswordReset?.success) {
        setIsOpen(true);
      } else {
        setError(data?.requestPasswordReset?.message || "Error al solicitar el restablecimiento");
      }
    } catch (err) {
      setError("Error al procesar la solicitud. Intenta nuevamente.");
      console.error("Error requesting password reset:", err);
    }
  };

  const handleModal = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <FormLayout>
        <FormInput
          labelText="Correo electrónico"
          type="email"
          value={email}
          handleChange={(e) => setEmail(e.target.value)}
        >
          <p className="text-[12px]">📩 Te enviaremos un enlace para crear una nueva contraseña.</p>
        </FormInput>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        <MainButton
          text={loading ? "Enviando..." : "Solicitar restablecimiento"}
          handleClick={handleResetPassword}
          disabled={loading}
        />
      </FormLayout>
      
      {isOpen && (
        <div className="fixed inset-0 bg-[#1f1f1f80] flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
            <h2 className="text-[16px] text-center mb-4">
              ¡Solicitud enviada con éxito! Si el correo está registrado, recibirás instrucciones.
            </h2>
            <MainButton
              text={"Ir a login"}
              handleClick={handleModal}
              disabled={false}
            />
          </div>
        </div>
      )}
    </>
  );
};