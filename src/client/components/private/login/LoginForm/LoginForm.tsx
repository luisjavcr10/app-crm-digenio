"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { LOGIN_MUTATION } from "@/client/services/auth";

export const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const [login, { loading }] = useMutation(LOGIN_MUTATION);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Todos los campos son obligatorios.");
      return;
    }

    setError("");

    try {
      const { data } = await login({
        variables: { email, password },
      });

      if (data?.login) {
        const { token, user } = data.login;

        // Guardar token y datos del usuario
        document.cookie = `auth_token=${token}; path=/; max-age=86400`;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("user", JSON.stringify(user));

        router.push("/");
      } else {
        setError("Credenciales inválidas.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error al iniciar sesión.");
    }
  };

  return (
      
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-3">
            <label>Correo Electrónico</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3 outline-neutral-3"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3 outline-neutral-3"
              type="password"
            />
            <Link href="/recovery-password" className="text-[12px]">
              ¿Te olvidaste tu contraseña?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <MainButton
            text={loading ? "Iniciando sesión..." : "Iniciar sesión"}
            handleClick={handleLogin}
            disabled={loading}
          />
        </form>
      
  );
};
