import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full">
      <div className="m-4 flex flex-col">
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
        <div className="mx-0 lg:mx-14 flex-1 flex flex-col justify-center items-center gap-8">
          <div className="flex flex-col">
            <h1 className="text-[32px] font-[600]">Iniciar sesión</h1>
            <p className="text-neutral-3 text-[12px]">
              Por favor, inicie sesión para continuar con su cuenta.
            </p>
          </div>
          <form className="w-full flex flex-col gap-3">
            <div className="flex flex-col gap-3">
              <label>Correo Electronico</label>
              <input className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3" type="text" />
            </div>
            <div className="flex flex-col gap-3">
              <label>Contraseña</label>
              <input className="shadow-input rounded-[12px] py-2 px-4 border border-neutral-3" type="text" />
              <Link href='/recovery-password' className="text-[12px]">¿Te olvidaste tu contraseña?</Link>
            </div>

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
