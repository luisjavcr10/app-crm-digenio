import { Loading } from "@/client/components/shared/Loading";

/**
 * Componente de loading para todas las páginas del módulo
 * Se muestra automáticamente durante la navegación y carga de páginas
 * Aprovecha la funcionalidad loading.tsx de Next.js App Router
 */
export default function LoadingPage() {
  return <Loading />;
}