"use client";
import Image from "next/image";
import Link from "next/link";
import { MainButton } from "app/components/shared/buttons/MainButton";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="m-4 flex-1 lg:flex-0 flex flex-col gap-10">
        <div className="flex justify-center lg:justify-start">
          <div
            className="
            relative
            w-27 h-8
          "
          >
            <Link className="cursor-pointer" href="/">
              <Image src="/images/logo.png" fill alt="logo" />
            </Link>
          </div>
        </div>

        <div className="mx-4 lg:mx-14 lg:my-20 flex-1 flex flex-col justify-start items-center gap-8">
          <div className="w-full flex flex-col items-center lg:items-start">
            <h1 className="text-[32px] font-[600]">Iniciar sesión</h1>
            <p className="text-center lg:text-start text-neutral-3 text-[12px]">
              Por favor, inicie sesión para continuar con su cuenta.
            </p>
          </div>
          <form className="w-[300px] lg:w-[400px] flex flex-col gap-6">
            <div className="flex flex-col gap-3">
              <label>Correo Electronico</label>
              <input
                className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3"
                type="text"
              />
            </div>
            <div className="flex flex-col gap-3">
              <label>Contraseña</label>
              <input
                className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3"
                type="text"
              />
              <Link href="/recovery-password" className="text-[12px]">
                ¿Te olvidaste tu contraseña?
              </Link>
            </div>
            <MainButton text="Iniciar sesión" handleClick={() => {}} />
          </form>
        </div>
      </div>
      <div className="hidden lg:block relative flex-1">
        <Image
          className="object-cover"
          src="/images/login-image.png"
          alt="image-login"
          fill
        />
      </div>
    </div>
  );
}
