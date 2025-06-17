"use client";
import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
//import { MainButton } from "@/client/components/shared/buttons/MainButton";

export const CreatePasswordForm = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //const [error, setError] = useState("");

  return (
    <FormLayout>
      <FormInput
        labelText="Contraseña"
        type="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      />

      <FormInput
        labelText="Confirmar contraseña"
        type="password"
        value={confirmPassword}
        handleChange={(e) => setConfirmPassword(e.target.value)}
      >

      </FormInput>

      {/**<MainButton
        text={loading ? "Iniciando sesión..." : "Iniciar sesión"}
        handleClick={handleLogin1}
        disabled={loading}
      />*/}
    </FormLayout>
  );
};
