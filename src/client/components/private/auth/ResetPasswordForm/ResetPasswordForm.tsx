"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { SuccessModal } from "@/client/components/shared/modal";
import { PASSWORD_RESET_RESULT } from "@/client/services/auth";

export const ResetPasswordForm = ({
  token
}: Readonly<{
  token: string;
}>) => {
  const [passwordResetResult, { loading }] = useMutation(PASSWORD_RESET_RESULT);
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  const handleResetPassword = async () => {
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
      const response = await passwordResetResult({
        variables: {
          token,
          newPassword: password,
        },
      });

      const result = response.data.resetPasswordWithToken;

      if (result.success) {
        setIsOpen(true);
      } else {
        setError(
          result.message || "Ocurrió un error al restablecer la contraseña."
        );
      }
    } catch (err: unknown) {
      console.log(err);
      setError("Error inesperado. Intenta nuevamente.");
    }
  };

  const handleModal = () => {
    router.push('/auth/login');
  };

  return (
    <>
      <FormLayout>
        <FormInput
          labelText="Nueva contraseña"
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
          handleClick={handleResetPassword}
          disabled={loading}
        />
      </FormLayout>

      <SuccessModal
        isOpen={isOpen}
        message="¡Contraseña restablecida con éxito! Ya puedes iniciar sesión."
        onClose={handleModal}
      />
    </>
  );
};