"use client";

import Image from "next/image";
import { useState } from "react";
import { Card } from "@/client/components/private/home/Card";
import { VectorIcon } from "@/client/components/shared/icons";
import { cardsInHome } from "@/client/constants/CardsInHome";

/**
 * Home page component with expandable mission/vision section
 */
export default function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const togglePanel = () => setIsOpen(!isOpen);

  return (
    <div className="flex flex-1 flex-col m-6 md:flex-row">
      {/* Main content area */}
      <div
        className={`relative flex min-h-[200px] w-full transition-all duration-1000 ease-in-out ${
          isOpen ? 'md:w-[calc(100%-500px)]' : 'md:w-full'
        }`}
      >
        {/* Background image */}
        <Image
          className="z-0 rounded-[12px] object-cover"
          src="/images/main-image.png"
          fill
          alt="background"
          priority
        />

        {/* Main text desktop */}
        {!isOpen && (
          <div className="absolute bottom-20 left-16 z-10 hidden max-w-80 text-start md:block">
            <p className="font-playfair text-[64px] font-[700] text-neutral-1">
              Estrategias diseño y producción
            </p>
            <p className="text-[16px] font-[500] text-neutral-1">
              Con ideas de negocio únicas y personas apasionadas por su trabajo.
            </p>
          </div>
        )}

        {/* Control buttons */}
        <div className="absolute bottom-0 right-0 z-10 hidden gap-2 rounded-tl-[12px] bg-neutral-5 pt-3 pl-3 dark:bg-neutral-1 md:flex">
          {!isOpen && (
            <div className="rounded-[12px] border border-neutral-3 px-4 py-2 text-[24px] shadow-button-home">
              Misión y visión
            </div>
          )}
          <button
            onClick={togglePanel}
            className="cursor-pointer rounded-[12px] border border-neutral-3 px-4 py-2 text-[24px] shadow-button-home"
            type="button"
            aria-label={isOpen ? 'Cerrar panel' : 'Abrir panel'}
          >
            <VectorIcon
              className={`transition-all duration-1000 ${
                isOpen ? 'rotate-180' : ''
              }`}
            />
          </button>
        </div>
      </div>

      {/* Main text mobile */}
      <div className="flex flex-col gap-4 px-8 py-3 text-center md:hidden">
        <p className="font-playfair text-[40px] font-[700]">
          Estrategias, diseño y producción
        </p>
        <p className="text-[16px] font-[500]">
          Con ideas de negocio únicas y personas apasionadas por su trabajo.
        </p>
      </div>

      {/* Expandable panel desktop */}
      <div
        className={`hidden flex-col items-center justify-around gap-4 overflow-hidden transition-all duration-1000 ease-in-out md:flex ${
          isOpen ? 'my-4 w-[500px] translate-x-0 opacity-100 md:ml-6' : 'w-0 translate-x-full opacity-0'
        }`}
      >
        <div className="flex w-[450px] flex-col items-center justify-around gap-4">
          {cardsInHome.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>

      {/* Cards mobile */}
      <div className="my-8 flex flex-col items-center justify-around gap-4 overflow-hidden md:hidden">
        <div className="flex w-full flex-col items-center justify-around gap-4">
          {cardsInHome.map((card, index) => (
            <Card
              key={index}
              title={card.title}
              description={card.description}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
