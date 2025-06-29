"use client";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/client/hooks/useAuth";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { FormLayout } from "../FormLayout";
import { FormInput } from "../FormInput";
import { useMutation } from "@apollo/client";

export const LoginForm = () => {
  const { handleLogin, loading } = useAuth();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin1 = async () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");

    const success = await handleLogin({ email, password });

    if (!success) {
      setError("Credenciales inválidas.");
      return;
    }

    router.push("/");
  };

  return (
    <FormLayout >
      <FormInput
        labelText="Correo Electrónico"
        type="email"
        value={email}
        handleChange={(e) => setEmail(e.target.value)}
      />

      <FormInput
        labelText="Contraseña"
        type="password"
        value={password}
        handleChange={(e) => setPassword(e.target.value)}
      >
        <Link href="/auth/recover-password" className="text-[12px]">
          ¿Olvidaste tu contraseña?
        </Link>
      </FormInput>

      {error && <p className="text-red-500 text-sm">{error}</p>}
      <MainButton
        text={loading ? "Iniciando sesión..." : "Iniciar sesión"}
        handleClick={handleLogin1}
        disabled={loading}
      />
    </FormLayout>
  );
};
