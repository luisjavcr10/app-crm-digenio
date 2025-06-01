"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ModuleLink } from "./ModuleLink";
import { useAuth } from "@/client/hooks/useAuth";
import { moduleLinks } from "@/client/constants/ModuleLinks";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export const Header = () => {
  const pathname = usePathname();
  const { isAuthenticated, initialized } = useAuth();

  if (pathname === "/login") return null;

  return (
    <header
      className="
        py-3 px-8
        shadow-header
        flex justify-between items-center
      "
    >
      <div className="flex justify-center items-center gap-16">
        <div className="relative w-27 h-8">
          <Link className="cursor-pointer" href="/">
            <Image src="/images/logo.png" fill alt="logo" />
          </Link>
        </div>

        {initialized && isAuthenticated && (
          <div className="hidden md:flex gap-12">
            {moduleLinks.map((moduleLink, index) => (
              <ModuleLink
                pathname={pathname}
                key={index}
                href={moduleLink.href}
                moduleTitle={moduleLink.moduleTitle}
              />
            ))}
          </div>
        )}
      </div>

      {initialized ? (
        isAuthenticated ? (
          <button className="cursor-pointer">
            <FaCircleUser className="hidden md:block w-[34px] h-[34px]" />
            <IoMenu className="block md:hidden w-[34px] h-[34px]" />
          </button>
        ) : (
          <Link
            href="/login"
            className="
              hidden md:block 
              bg-neutral-2 dark:bg-neutral-4 
              hover:bg-neutral-1 dark:hover:bg-neutral-3
              text-neutral-4 dark:text-neutral-2  text-[12px] 
              py-2 px-6 
              rounded-[12px]
            "
          >
            Inicia sesión
          </Link>
        )
      ) : (<></>)}
    </header>
  );
};
