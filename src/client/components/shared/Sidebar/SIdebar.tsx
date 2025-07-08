"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/client/hooks/useAuth";
import { useSidebarStore } from "@/client/store/sidebarStore";
import { SbItem, SbSubItem } from "./subcomponents";
import { Logo } from "../Logo";
import { RefreshIcon, DocumentIcon, ChartIcon, UserIcon, ChevronLeft,EyeIcon, ListAddIcon } from "../icons";
import { useOkrModalStore, useStartupModalStore, useUsersModalStore } from "@/client/store/modalsStore";

export const Sidebar = () => {
  const openOkrModal = useOkrModalStore((state) => state.open);
  const openStartupModal = useStartupModalStore((state) => state.open);
  const openUsersModal = useUsersModalStore((state) => state.open);
  
  const { user, isAuthenticated } = useAuth();
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

  if(!isAuthenticated) return null;

  if (pathname.startsWith("/auth")) return null;

  return (
    <div
      className={`relative z-50 transition-all duration-1000 ease-in-out overflow-hidden shadow-sidebar dark:border-r dark:border-neutral-3 w-[350px]
        ${isOpen ? 'translate-x-0' : '-translate-x-full hidden'}
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
          <SbItem
              icon={<RefreshIcon /> }
              isOpen={indexItemOpen[0]}
              handleOpen={() => handleSidebarItems(0)}
              title="Objetivos"
            >
              {indexItemOpen[0] && 
              <>
                <SbSubItem 
                  href="/okrs"
                  icon={<EyeIcon />}
                  title="Ver objetivos"
                />
                {user.roles.includes('ADMIN') && 
                <SbSubItem 
                  href="/okrs"
                  openModal={openOkrModal}
                  icon={<ListAddIcon />}
                  title="Crear objetivo"
                />
                }
              </>
              }
            </SbItem>
            <SbItem
              icon={<DocumentIcon />}
              isOpen={indexItemOpen[1]}
              handleOpen={() => handleSidebarItems(1)}
              title="Startups"
            >
              {indexItemOpen[1] && 
              <>
              <SbSubItem 
                href="/portfolio"
                icon={<EyeIcon />}
                title="Ver startups"
              />
              {user.roles.includes('TEAMLEADER') && 
              <SbSubItem 
                href="/portfolio"
                openModal={openStartupModal}
                icon={<ListAddIcon />}
                title="Crear startup"
              />
              }
              </>
              }
            </SbItem>
            <SbItem
              icon={<ChartIcon />}
              isOpen={indexItemOpen[2]}
              handleOpen={() => handleSidebarItems(2)}
              title="Seguimiento"
            >
              {indexItemOpen[2] && 
              <SbSubItem 
                href="/follow-up"
                icon={<EyeIcon />}
                title="Ver seguimiento"
              />
              }
            </SbItem>
            {user.roles.includes('ADMIN') && 
            <SbItem
              icon={<UserIcon />}
              isOpen={indexItemOpen[3]}
              handleOpen={() => handleSidebarItems(3)}
              title="Usuarios y grupos"
            >
              {indexItemOpen[3] && 
              <>
              <SbSubItem 
                href="/users-teams"
                icon={<EyeIcon />}
                title="Ver usuarios y grupos"
              />
              <SbSubItem 
                href="/users-teams"
                openModal={openUsersModal}
                icon={<ListAddIcon />}
                title="Crear nuevo registro"
              />
              </>
              }
            </SbItem>}
        </div>
      </div>
    </div>
  );
};
