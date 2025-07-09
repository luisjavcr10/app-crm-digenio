"use client";
import { Header } from "../../shared/Header";
import { useSidebarStore } from "@/client/store/sidebarStore";

export const PageSection = ({children}: Readonly<{children:React.ReactNode}>) => {
  const isOpen = useSidebarStore((state) => state.isOpen);

  return (
    <div className={`${isOpen? 'md:h-[calc(100vh-40px)]':'min-h-[calc(100vh-40px)]'} flex-1 flex flex-col`}>
      <Header />
      {children}
    </div>
  );
};
