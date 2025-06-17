"use client";

import { useState } from "react";
import Image from "next/image";
import { Card } from "@/client/components/private/home/Card";
import { cardsInHome } from "@/client/constants/CardsInHome";

export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="dark:bg-neutral-2 flex-1 flex flex-col md:flex-row  pt-[60px]">
      <div className="flex-1 m-6 relative min-h-[200px]">
        {/* Background image */}
        <Image
          className="z-0 object-cover rounded-[12px]"
          src="/images/main-image.png"
          fill
          alt="background"
          priority
        />

        {/* Main text */}
        {!isOpen && (
          <div
            className="max-w-80 hidden md:block
            absolute z-10 bottom-20 left-16 
            text-start text-[64px] font-playfair font-[700] text-neutral-1"
          >
            <p>Estrategias diseño y producción</p>
            <p className="text-[16px] font-[500] text-start">
              Con ideas de negocio únicas y personas apasionadas por su trabajo.
            </p>
          </div>
        )}

        <div
          className="pt-3 pl-3 hidden md:flex gap-2
            absolute z-10 bottom-0 right-0 
            bg-neutral-5 dark:bg-neutral-2 rounded-tl-[12px]
            "
        >
          {!isOpen && (
            <div className="border border-neutral-3 rounded-[12px] shadow-button-home px-4 py-2 text-[24px]">
              Misión y visión
            </div>
          )}
          <div
            onClick={() => setIsOpen(!isOpen)}
            className={`${
              isOpen ? "rotate-180" : ""
            } cursor-pointer border border-neutral-3 rounded-[12px] shadow-button-home px-4 py-2 text-[24px]`}
          >
            ↗
          </div>
        </div>
      </div>

      {/* Main text mobile */}
      <div
        className="
            py-3 px-8 flex flex-col gap-4
            md:hidden 
            text-center text-[40px] font-playfair font-[700]"
      >
        <p>Estrategias, diseño y producción</p>
        <p className="text-[16px] font-[500]">
          Con ideas de negocio únicas y personas apasionadas por su trabajo.
        </p>
      </div>

      {isOpen && (
        <div className="max-w-[400px] mx-6 my-4 md:ml-5 md:p-10 md:mr-12 flex flex-col gap-4 justify-around items-center">
          {cardsInHome.map((card, index) => (
            <Card
              title={card.title}
              description={card.description}
              key={index}
            />
          ))}
        </div>
      )}
    </div>
  );
}
