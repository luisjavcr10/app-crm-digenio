"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/client/store/sidebarStore";
import { ChevronLeft } from "../icons/sidebarToggles";
import { Logo } from "../Logo";
import { SbItem } from "./SbItem";
import { RefreshIcon, DocumentIcon, ChartIcon, UserIcon } from "../icons";

const sidebarItems = [
  {
    id: 0,
    title: "Objetivos",
    items: [
      {
        title:"Ver objetivos"
      },
      {
        title:"Crear nuevo objetivo"
      }
    ]
  },
  {
    id: 1,
    title: "Startups",
    items: [
      {
        title:"Ver startups"
      },
      {
        title:"Crear nueva startup"
      }
    ]
  },
  {
    id: 2,
    title: "Seguimiento",
    items: [
      {
        title:"Ver seguimiento"
      }
    ]
  },
  {
    id: 3,
    title: "Usuarios y grupos",
    items: [
      {
        title:"Ver usuarios y grupos"
      },
      {
        title:"Crear nuevo registro"
      }
    ]
  },
];

export const Sidebar = () => {
  const isOpen = useSidebarStore((state) => state.isOpen);
  const close = useSidebarStore((state) => state.close);
  const pathname = usePathname();

  const [indexItemOpen, setIndexItemOpen] = useState([
    false,
    false,
    false,
    false,
  ]);
  const handleSidebarItems = (index: number) => {
    setIndexItemOpen((prevState) => {
      const newState = [...prevState];
      newState[index] = !newState[index];
      return newState;
    });
  };

  if (pathname.startsWith("/auth")) return null;

  return (
    <div
      className={`
        relative 
        shadow-sidebar 
        z-50 
        transition-all 
        duration-300 
        ease-in-out
        overflow-hidden
        ${isOpen ? 'w-[350px]' : 'w-0'}
      `}
    >
      <button onClick={close} className="absolute top-1 right-1 p-4 cursor-pointer">
        <ChevronLeft />
      </button>

      <div className="w-full flex flex-col items-center gap-10 py-12">
        <div className="relative w-54 h-16 my-4">
          <Logo />
        </div>

        <div className="flex flex-col w-full border-b border-neutral-3">
          {sidebarItems.map((item, index) => (
            <SbItem
              key={item.id}
              icon={index ===0 ? <RefreshIcon /> : index===1? <DocumentIcon /> : index===2? <ChartIcon /> : <UserIcon />}
              isOpen={indexItemOpen[item.id]}
              handleOpen={() => handleSidebarItems(item.id)}
              title={item.title}
              subItems={item.items}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
