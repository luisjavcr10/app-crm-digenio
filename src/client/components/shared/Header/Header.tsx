"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ModuleLink } from "./ModuleLink";
import { MenuToggle } from "./MenuToggle/MenuToggle";
import { Logo } from "../Logo";
import { useAuth } from "@/client/hooks/useAuth";
import { moduleLinks } from "@/client/constants/ModuleLinks";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const { isAuthenticated, initialized } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Cambia el estado cuando el scroll sea mayor a 0
      setScrolled(window.scrollY > 0);
    };

    // Agregar el event listener
    window.addEventListener("scroll", handleScroll);

    // Limpiar el event listener al desmontar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setIsOpen(!isOpen);
  };

  if (pathname.startsWith("/auth")) return null;

  return (
    <header
      className={` py-1  ${scrolled ? "px-10 md:px-40" : "px-3 shadow-header"}
        transition-all duration-300 
        w-full
        min-h-[60px]
        
        fixed
        top-0
        z-50`}
    >
      <nav
        className={`
          py-2 px-5 
          relative 
          flex justify-between items-center 
          transition-all duration-300 
          rounded-[16px]
          ${
            scrolled
              ? "backdrop-blur-xl bg-white/50 dark:bg-black/50 mt-1 shadow-input"
              : " bg-neutral-5 dark:bg-neutral-1"
          }`}
      >
        <div className="flex justify-center items-center gap-16">
          <div className="relative w-27 h-8">
            <Logo />
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
            <>
              <button onClick={handleMenuToggle} className="cursor-pointer">
                <FaCircleUser className="hidden md:block w-[34px] h-[34px]" />
                <IoMenu className="block md:hidden w-[34px] h-[34px]" />
              </button>
              {isOpen && (
                <MenuToggle
                  isScrolled={scrolled}
                  isOpen={isOpen}
                  handleOpen={handleMenuToggle}
                />
              )}
            </>
          ) : (
            <Link
              href="/login"
              className={`
              transition-all duration-300
        ${
          scrolled
            ? "bg-neutral-2 dark:bg-neutral-4 text-neutral-5 dark:text-neutral-1 hover:bg-neutral-1 dark:hover:bg-neutral-3"
            : "bg-neutral-2 dark:bg-neutral-4 text-neutral-5 dark:text-neutral-1 hover:bg-neutral-1 dark:hover:bg-neutral-3"
        }
              text-[12px] 
              py-2 px-6 
              rounded-[12px]
            `}
            >
              Inicia sesión
            </Link>
          )
        ) : (
          <></>
        )}
      </nav>
    </header>
  );
};
