import { Loading } from "@/client/components/shared/Loading";

/**
 * Componente de loading global para toda la aplicación
 * Se muestra durante la carga inicial y navegación entre rutas principales
 * Aprovecha la funcionalidad loading.tsx de Next.js App Router
 */
export default function GlobalLoadingPage() {
  return <Loading />;
}