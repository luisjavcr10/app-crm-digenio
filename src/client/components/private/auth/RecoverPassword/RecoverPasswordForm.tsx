"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { SuccessModal } from "@/client/components/shared/modal";
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
      
      <SuccessModal
        isOpen={isOpen}
        message="¡Solicitud enviada con éxito! Si el correo está registrado, recibirás instrucciones."
        onClose={handleModal}
      />
    </>
  );
};