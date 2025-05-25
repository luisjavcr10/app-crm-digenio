"use client";
import { useState } from "react";
import { DataServer } from "app/components/shared/icons/DataServer";
import { MainButton } from "app/components/shared/buttons/MainButton/MainButton";
import { OkrFormModal } from "app/components/private/okrs/OkrFormModal/OkrFormModal";

export default function OkrsPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen my-6 mx-8 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        {/** Seccion del titulo */}
        <div className="w-full">
          <p className="text-[36px] font-[600] mb-2">OKRs</p>
          <p>
            Gestión de objetivos para alinear y dar seguimiento a las metas de
            la empresa.
          </p>
        </div>
        {/** Boton para agregar okrs */}
        <div className="w-full flex justify-center lg:justify-end">
            <MainButton text="Agregar nuevo OKR" handleClick={()=>setIsModalOpen(true)} />
        </div>
      </div>

      {/** Modal para agregar okrs */}
      {isModalOpen && (
        <OkrFormModal handleClose={()=>setIsModalOpen(false)} />
      )}

    {/** Contenedor para los okrs */}
      <div className="min-h-screen gap-4 flex flex-col justify-center items-center border border-neutral-3 rounded-[24px]">
            <DataServer />
            <p>No data to show</p>
      </div>
    </div>
  );
}
