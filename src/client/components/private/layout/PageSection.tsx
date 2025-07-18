"use client";
import { Header } from "../../shared/Header";
import { useSidebarStore } from "@/client/store/sidebarStore";

/**
 * Componente que contiene el contenido principal de las páginas
 * Se ajusta dinámicamente según el estado del sidebar
 */
export const PageSection = ({children}: Readonly<{children:React.ReactNode}>) => {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out min-h-0">
      <Header />
      <div className="flex-1 flex transition-all duration-500 ease-in-out min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
