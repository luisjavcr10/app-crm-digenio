"use client";
import { Logo } from "../Logo";

/**
 * Componente de loading que muestra el logo con animación
 * Diseñado para ocupar toda la pantalla durante la carga inicial
 */
export const Loading = () => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-6">
        {/* Logo con animación de pulso */}
        <div className="relative w-108 h-32 ">
          <Logo />
        </div>
        
       <div className="flex items-center gap-2">
          <div className="w-3 h-3 bg-primary-1 rounded-full animate-bounce [animation-delay:-0.4s] scale-110"></div>
          <div className="w-3 h-3 bg-primary-1 rounded-full animate-bounce [animation-delay:-0.2s] scale-110"></div>
          <div className="w-3 h-3 bg-primary-1 rounded-full animate-bounce scale-110"></div>
        </div>

      </div>
    </div>
  );
};