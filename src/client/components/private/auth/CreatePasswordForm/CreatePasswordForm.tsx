"use client";
import { useState } from "react";
import { useMutation } from "@apollo/client";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { SET_PASSWORD_FROM_TOKEN } from "@/client/services/auth";

export const CreatePasswordForm = ({
  token,
}: Readonly<{
  token: string;
}>) => {
  const [SetPasswordFromToken, { loading }] = useMutation(
    SET_PASSWORD_FROM_TOKEN
  );
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");

  const handleCreatePassword = async () => {
    if (!password || !confirmPassword) {
      setError("Todos los campos son obligatorios");
      return;
    }

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    setError("");

    try {
      const response = await SetPasswordFromToken({
        variables: {
          token,
          password: password,
        },
      });

      const result = response.data.setPasswordFromToken;

      if (result.success) {
        // puedes redirigir o mostrar un mensaje
        alert("¡Contraseña creada con éxito! Ya puedes iniciar sesión.");
        // router.push('/login') si usas next/router
      } else {
        setError(
          result.message || "Ocurrió un error al guardar la contraseña."
        );
      }
    } catch (err: unknown) {
      setError("Error inesperado. Intenta nuevamente.");
    }
  };

  return (
    <FormLayout >
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
        disabled={loading}
      />
    </FormLayout>
  );
};
