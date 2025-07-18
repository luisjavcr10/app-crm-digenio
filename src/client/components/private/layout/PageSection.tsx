import { Header } from "../../shared/Header";

/**
 * Componente que contiene el contenido principal de las páginas (okrs, startups, etc).
 * Se ajusta dinámicamente según el estado del sidebar
 */
export const PageSection = ({children}: Readonly<{children:React.ReactNode}>) => {
  return (
    <div className="flex-1 flex flex-col transition-all duration-500 ease-in-out min-h-0">
      <Header />
      <div className="flex-1 flex transition-all duration-500 ease-in-out min-h-0 overflow-hidden">
        {children}
      </div>
    </div>
  );
};
