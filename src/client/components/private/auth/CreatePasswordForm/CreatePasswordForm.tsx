"use client";
import { useState } from "react";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";

export const CreatePasswordForm = ({
  token
}:Readonly<{
  token:string
}>) => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleCreatePassword = () =>{
    if(!password || !confirmPassword){
      setError("Todos los campos son obligatorios");
      return;
    }

    if(password !== confirmPassword){
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");
  }

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
        <p className="text-[12px]">✅ Las contraseñas deben coincidir</p>
      </FormInput>
      
      {error && <p className="text-red-500 text-sm">{error}</p>}

      <MainButton
        text={"Guardar contraseña"}
        handleClick={handleCreatePassword}
        disabled={false}
      />
    </FormLayout>
  );
};
