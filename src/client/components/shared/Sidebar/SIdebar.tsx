"use client";

import { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/client/hooks/useAuth";
import { useSidebarStore } from "@/client/store/sidebarStore";
import { SbItem, SbSubItem } from "./subcomponents";
import { Logo } from "../Logo";
import {
  RefreshIcon,
  DocumentIcon,
  ChartIcon,
  UserIcon,
  ChevronLeft,
  EyeIcon,
  ListAddIcon,
} from "../icons";
import {
  useOkrModalStore,
  useStartupModalStore,
  useUsersModalStore,
} from "@/client/store/modalsStore";

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

  if (!isAuthenticated) return null;

  if (pathname.startsWith("/auth")) return null;

  return (
    <>
      {/* Backdrop para móviles */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        />
      )}

      <div
        className={`
          md:relative md:z-50 md:transition-all md:duration-500 md:ease-in-out md:overflow-hidden md:shadow-sidebar md:dark:border-r md:dark:border-neutral-3 md:h-full
          fixed top-0 left-0 z-50 h-full transition-transform duration-500 ease-in-out shadow-sidebar dark:border-r dark:border-neutral-3
          ${
            isOpen
              ? "md:w-[350px] md:translate-x-0 translate-x-0"
              : "md:w-0 md:-translate-x-full -translate-x-full"
          }
        `}
      >
        <div className="w-[350px] h-full bg-background">
          <button
            onClick={close}
            className="absolute top-1 right-1 p-4 cursor-pointer"
          >
            <ChevronLeft />
          </button>

          <div className="w-full flex flex-col items-center gap-10 py-12">
            <div className="relative w-54 h-16 my-4">
              <Logo />
            </div>

            <div className="flex flex-col w-full border-b border-neutral-3">
              <SbItem
                icon={<RefreshIcon />}
                isOpen={indexItemOpen[0]}
                handleOpen={() => handleSidebarItems(0)}
                title="Objetivos"
              >
                {indexItemOpen[0] && (
                  <>
                    <SbSubItem
                      href="/okrs"
                      icon={<EyeIcon />}
                      title="Ver objetivos"
                    />
                    {user.roles.includes("ADMIN") && (
                      <SbSubItem
                        href="/okrs"
                        openModal={openOkrModal}
                        icon={<ListAddIcon />}
                        title="Crear objetivo"
                      />
                    )}
                  </>
                )}
              </SbItem>
              <SbItem
                icon={<DocumentIcon />}
                isOpen={indexItemOpen[1]}
                handleOpen={() => handleSidebarItems(1)}
                title="Startups"
              >
                {indexItemOpen[1] && (
                  <>
                    <SbSubItem
                      href="/portfolio"
                      icon={<EyeIcon />}
                      title="Ver startups"
                    />
                    {user.roles.includes("TEAMLEADER") && (
                      <SbSubItem
                        href="/portfolio"
                        openModal={openStartupModal}
                        icon={<ListAddIcon />}
                        title="Crear startup"
                      />
                    )}
                  </>
                )}
              </SbItem>
              <SbItem
                icon={<ChartIcon />}
                isOpen={indexItemOpen[2]}
                handleOpen={() => handleSidebarItems(2)}
                title="Seguimiento"
              >
                {indexItemOpen[2] && (
                  <SbSubItem
                    href="/follow-up"
                    icon={<EyeIcon />}
                    title="Ver seguimiento"
                  />
                )}
              </SbItem>
              {user.roles.includes("ADMIN") && (
                <SbItem
                  icon={<UserIcon />}
                  isOpen={indexItemOpen[3]}
                  handleOpen={() => handleSidebarItems(3)}
                  title="Usuarios y grupos"
                >
                  {indexItemOpen[3] && (
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
                  )}
                </SbItem>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
