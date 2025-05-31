"use client";
import { usePathname } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FaCircleUser } from "react-icons/fa6";
import { IoMenu } from "react-icons/io5";
import { ModuleLink } from "./ModuleLink";
import { moduleLinks } from "@/client/constants/ModuleLinks";

export const Header = () => {
  const pathname = usePathname();


  if(pathname === '/login') return null;
  return (
    <header
      className="
        py-3 px-8
        shadow-header
        flex justify-between items-center
      "
    >
      <div className="flex justify-center items-center gap-16">
        <div
          className="
            relative
            w-27 h-8
          "
        >
          <Link className="cursor-pointer" href='/' >
            <Image src="/images/logo.png" fill alt="logo" />
          </Link>
        </div>

        <div className="hidden md:flex gap-12">
          {moduleLinks.map((moduleLink, index) => (
              <ModuleLink
                key={index}
                href={moduleLink.href}
                moduleTitle={moduleLink.moduleTitle}
              />
          ))}
        </div>
      </div>

      <div>
        <FaCircleUser className="hidden md:block w-[34px] h-[34px]" />
        <IoMenu className="block md:hidden w-[34px] h-[34px]" />
      </div>
    </header>
  );
};
