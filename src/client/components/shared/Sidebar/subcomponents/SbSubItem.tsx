import { useRouter } from "next/navigation";
import { useSidebarStore } from "@/client/store/sidebarStore";

export const SbSubItem = ({ 
  icon,
  title,
  href,
  openModal
}: Readonly<{ 
  icon: React.ReactElement,
  title: string;
  href:string;
  openModal?: () => void;
}>) => {
  const router = useRouter();
  const close = useSidebarStore((state) => state.close);

  const handleRoute = () => {
    router.push(href);
    if(openModal){
      openModal();
    }
    
    // Cerrar sidebar solo en móviles
    if (window.innerWidth < 768) {
      close();
    }
  }

  return (
    <div onClick={handleRoute} className="cursor-pointer px-6 py-2.5 flex justify-start items-center gap-4 bg-neutral-4 dark:bg-neutral-2 border-t border-neutral-3">
      {icon}
      {title}
    </div>
  );
};
