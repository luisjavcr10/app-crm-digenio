import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
  return (
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
  );
};
