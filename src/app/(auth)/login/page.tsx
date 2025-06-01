import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "@/client/components/private/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen w-full flex">
      <div className="md:min-w-[550px] m-4 flex-1 md:flex-0 flex flex-col gap-10">
        <div className="pt-6 mx-4 my-4 md:my-0 flex justify-start">
          <div className="relative w-27 h-8">
            <Link className="cursor-pointer" href="/">
              <Image src="/images/logo.png" fill alt="logo" />
            </Link>
          </div>
        </div>
        <div className="mx-4 md:mx-14 md:my-20 flex-1 flex flex-col justify-start items-center gap-8">
          <div className="w-full flex flex-col items-start">
            <h1 className="text-[32px] font-[600]">Iniciar sesión</h1>
            <p className="text-center md:text-start text-neutral-3 text-[12px]">
              Por favor, ingresa tus credenciales.
            </p>
          </div>
            <LoginForm />
            
        </div>
      </div>
      <div className="hidden md:block relative flex-1">
        <Image
          className="object-cover"
          src="/images/login-image.png"
          alt="image-login"
          fill
          priority
        />
      </div>
    </div>
  );
}
