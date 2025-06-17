"use client";

import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";

export const RecoverPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const handleResetPassword = () => {
    if (!email) {
      setError("Todos los campos son obligatorios");
      return;
    }
    setError("");
  };

  return (
    <FormLayout>
      <FormInput
        labelText="Correo electroncio"
        type="email"
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      >
        <p className="text-[12px]">📩 Te enviaremos un enlace para crear una nueva contraseña.</p>
      </FormInput>

      {error && <p className="text-red-500 text-sm">{error}</p>}

      <MainButton
        text={"Guardar contraseña"}
        handleClick={handleResetPassword}
        disabled={false}
      />
    </FormLayout>
  );
};
