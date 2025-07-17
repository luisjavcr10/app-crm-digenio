"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { SuccessModal } from "@/client/components/shared/modal";
import { SET_PASSWORD_FROM_TOKEN } from "@/client/services/auth";

export const CreatePasswordForm = ({
  token,
}: Readonly<{
  token: string;
}>) => {
  const [SetPasswordFromToken, { loading }] = useMutation(
    SET_PASSWORD_FROM_TOKEN
  );
  const router = useRouter();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

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
        setIsOpen(true);
      } else {
        setError(
          result.message || "Ocurrió un error al guardar la contraseña."
        );
      }
    } catch (err: unknown) {
      console.log(err);
      setError("Error inesperado. Intenta nuevamente.");
    }
  };

  const handleModal = () =>{
    router.push('/auth/login')
  }

  return (
    <>
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
          disabled={loading}
        />
      </FormLayout>

      <SuccessModal
        isOpen={isOpen}
        message="¡Contraseña creada con éxito! Ya puedes iniciar sesión."
        onClose={handleModal}
      />
    </>
  );
};
