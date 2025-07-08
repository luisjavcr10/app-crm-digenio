"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/client/hooks/useAuth";
import { useSidebarStore } from "@/client/store/sidebarStore";
import { moduleLinks } from "@/client/constants/ModuleLinks";
import { ModuleLink, MenuToggle } from "./subcomponents";
import { Logo } from "../Logo";
import { ChevronLeft } from "../icons/sidebarToggles";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";

export const Header = () => {
  const [isOpenMenu, setisOpenMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hasMounted, setHasMounted] = useState(false); // <- NUEVO
  const pathname = usePathname();
  const { user ,isAuthenticated, initialized } = useAuth();
  const toggleSidebar = useSidebarStore((state) => state.toggle);
  const isOpen = useSidebarStore((state) => state.isOpen);

  useEffect(() => {
    setHasMounted(true); // <- NUEVO

    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // por si ya está scrolleado

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleMenuToggle = () => {
    setisOpenMenu(!isOpenMenu);
  };

  if (!hasMounted) return null; // <- NUEVO

  if (pathname.startsWith("/auth")) return null;

  return (
    <header
      className={`py-1 ${
          !scrolled || (scrolled && isOpen)
            ? "px-3 shadow-header bg-neutral-5"
            : "px-10 md:px-40"
        }
      transition-all duration-300 
      w-full max-w-full min-h-[60px] sticky top-0 z-40`}
    >
      <nav
        className={`
          py-2 px-5 
          relative 
          flex ${isOpen ? "justify-end" : "justify-between"} items-center 
          transition-all duration-300 
          rounded-[16px]
          ${
            !scrolled || (scrolled && isOpen)
              ? "bg-neutral-5 dark:bg-neutral-1"
              : "backdrop-blur-xl bg-neutral-5/50 dark:bg-neutral-1/50 mt-1 shadow-input"
          }
`}
      >
        {!isOpen && (
          <div className="flex justify-center items-center gap-16">
           {initialized && isAuthenticated && <button onClick={toggleSidebar} className="p-2 cursor-pointer">
              <ChevronLeft className="rotate-180" />
            </button>}
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
                {user.roles.includes('ADMIN') && <ModuleLink
                    pathname={pathname}
                    href="/users-teams"
                    moduleTitle="Usuarios"
                />}
              </div>
            )}
          </div>
        )}

        {initialized ? (
          isAuthenticated ? (
            <>
              <button onClick={handleMenuToggle} className="cursor-pointer">
                <FaCircleUser className="hidden md:block w-[34px] h-[34px]" />
                <IoMenu className="block md:hidden w-[34px] h-[34px]" />
              </button>
              {isOpenMenu && (
                <MenuToggle isOpen={isOpenMenu} handleOpen={handleMenuToggle} />
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
        ) : null}
      </nav>
    </header>
  );
};

