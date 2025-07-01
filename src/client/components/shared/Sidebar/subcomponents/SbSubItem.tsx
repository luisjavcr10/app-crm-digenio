import { useRouter } from "next/navigation";

export const SbSubItem = ({ 
  icon,
  title,
  href 
}: Readonly<{ 
  icon: React.ReactElement,
  title: string;
  href:string;
}>) => {
  const router = useRouter();

  const handleRoute = () =>{
    router.push(href);
  }

  return (
    <div onClick={handleRoute} className="cursor-pointer px-6 py-2.5 flex justify-start items-center gap-4 bg-neutral-4 border-t border-neutral-3">
      {icon}
      {title}
    </div>
  );
};
