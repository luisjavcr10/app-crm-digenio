"use client";
import { useState } from "react";
import { DataServer } from "@/client/components/shared/icons/DataServer";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrFormModal } from "@/client/components/private/okrs/OkrFormModal";
import { OkrCard } from "@/client/components/private/okrs/OkrCard";

interface okrProps {
  nombresResponsable: string;
  nombreEquipo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  titulo: string;
  estado: string;
}

const okrsList = [
  {
    titulo:"Titulo del OKR",
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Elevar la calidad del software entregado, reduciendo defectos críticos en producción y fortaleciendo los procesos de validación.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
    estado: "Completado"
  },
  {
    titulo:"Titulo del OKR",
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Elevar la calidad del software entregado, reduciendo defectos críticos en producción y fortaleciendo los procesos de validación.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
    estado: "Completado"
  },
  {
    titulo:"Titulo del OKR",
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Elevar la calidad del software entregado, reduciendo defectos críticos en producción y fortaleciendo los procesos de validación.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
    estado: "Completado"
  }
];

export default function OkrsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [okrs, setOkrs] = useState<okrProps[]>(okrsList);

  const handleAddOkr = (newOkr: okrProps) => {
    setOkrs([newOkr,...okrs]);
  }

  return (
    <div className="pt-[60px] my-6 mx-8 flex flex-col gap-8">
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
          <MainButton
            text="Agregar nuevo OKR"
            handleClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>

      {/** Modal para agregar okrs */}
      {isModalOpen && (
        <OkrFormModal handleSubmit={handleAddOkr} handleClose={() => setIsModalOpen(false)} />
      )}

      {/** Contenedor para los okrs */}

      {okrs.length === 0 ? (
        <div className="min-h-[550px] flex flex-col justify-center items-center gap-4  border border-neutral-3 rounded-[24px]">
          <DataServer />
          <p>No data to show</p>
        </div>
      ) : (
        <div className="min-h-[550px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Listado para moviles */}
          <div className="flex flex-col gap-4 md:hidden">
            {okrs.map((okr, idx) => (
              <OkrCard key={idx} index={idx} okr={okr} />
            ))}
          </div>

          {/* Listado desktop */}
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="hidden md:flex flex-col gap-4">
              {okrs
                .filter((_, index) => index % 3 === colIndex)
                .map((okr, idx) => (
                  <OkrCard key={idx} index={idx} okr={okr} />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
