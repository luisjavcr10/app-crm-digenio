import Image from "next/image";
import Link from "next/link";

export const AuthLayout = ({
  children,
}: Readonly<{ children: React.ReactNode }>) => {
  return (
    <div className="h-[calc(100vh-40px)] w-full flex">
      <div className="md:min-w-[500px] m-4 flex-1 md:flex-0 flex flex-col gap-10">
        <div className="pt-6 mx-4 my-4 md:my-0 flex justify-start">
          <div className="relative w-[225px] h-[67px]">
            <Link href="/" className="cursor-pointer">
              {/* Logo para modo claro - visible por defecto */}
              <Image
                src="/images/logoWhite.png"
                fill
                alt="logo"
                className="block dark:hidden"
              />
              {/* Logo para modo oscuro - visible solo en dark mode */}
              <Image
                src="/images/logoDark.png"
                fill
                alt="logo"
                className="hidden dark:block"
              />
            </Link>
          </div>
        </div>
        <div className="mx-4 md:mx-14 md:my-20 flex-1 flex flex-col justify-start items-center gap-8">
          {children}
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
};
