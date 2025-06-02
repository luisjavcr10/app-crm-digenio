"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useAuth } from "@/client/hooks/useAuth";

export const LoginForm = () => {
  const { handleLogin, loading} = useAuth();

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
      
        <form
          className="w-full flex flex-col gap-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <div className="flex flex-col gap-3">
            <label>Correo Electrónico</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3 outline-neutral-3 caret-neutral-3"
              type="email"
            />
          </div>
          <div className="flex flex-col gap-3">
            <label>Contraseña</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3 outline-neutral-3 caret-neutral-3"
              type="password"
            />
            <Link href="/recovery-password" className="text-[12px]">
              ¿Te olvidaste tu contraseña?
            </Link>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <MainButton
            text={loading ? "Iniciando sesión..." : "Iniciar sesión"}
            handleClick={handleLogin1}
            disabled={loading}
          />
        </form>
      
  );
};
