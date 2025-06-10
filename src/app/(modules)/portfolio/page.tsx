"use client";
import { useState } from "react";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { TitleSection } from "@/client/components/shared/TitleSection/TitleSection";
import { NoData } from "@/client/components/shared/NoData";
import { StartupCard } from "@/client/components/private/portfolio/StartupCard";
import { ModalLayout } from "@/client/components/shared/ModalLayout";
import { OkrTextInput } from "@/client/components/private/okrs/OkrTextInput";
import { OkrTextareaInput } from "@/client/components/private/okrs/OkrTextareaInput";

interface startupProps {
  client: string;
  title: string;
  description: string;
  responsible: string;
  monthlyMetric: string;
}

export default function PortfolioPage() {
  const [startups, setStartups] = useState<startupProps[]>([
    {
      client: "Client 1",
      title: "Startup 1",
      description: "Description 1",
      responsible: "Responsible 1",
      monthlyMetric: "Monthly Metric 1",
    },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(true);

  return (
    <div className="pt-[60px] my-6 mx-8 flex flex-col gap-8">
      <TitleSection
        name="Portfolio"
        description="Registro y monitoreo de los proyectos o productos que contribuyen al cumplimiento de los objetivos."
      >
        <MainButton
          text="Agregar nueva startup"
          handleClick={() => setIsModalOpen(true)}
        />
      </TitleSection>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <select
            id="status-filter"
            className="px-4 py-2 border border-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-[12px] text-neutral-3"
            value=""
            onChange={() => {}}
          >
            <option value="all">Etapa</option>
            <option value="Pending">Pendientes</option>
            <option value="Completed">Completados</option>
            <option value="In Progress">En progreso</option>
          </select>
        </div>
      </div>

      {startups.length === 0 ? (
        <NoData />
      ) : (
        <div className="min-h-[450px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 md:hidden">
            {startups.map((st, idx) => (
              <StartupCard key={idx} st={st} />
            ))}
          </div>
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="hidden md:flex flex-col gap-4">
              {startups
                .filter((_, index) => index % 3 === colIndex)
                .map((st, idx) => (
                  <StartupCard key={idx} st={st} />
                ))}
            </div>
          ))}
        </div>
      )}

      {isModalOpen && (
        <ModalLayout onClose={() => setIsModalOpen(false)}>
          <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
            <h2 className="text-[24px] lg:text-[32px] font-[600]">
              Agregar nueva Startup
            </h2>
          </div>

          <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Cliente</p>
              <OkrTextInput
                label="Cliente"
                value=""
                onChange={() => {}}
                placeholder="Nombres y apellidos del cliente"
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Nombre</p>
              <OkrTextInput
                label="Nombre"
                value=""
                onChange={() => {}}
                placeholder="Nombres de la startup"
              />
            </div>

            <OkrTextareaInput
              label="Descripción"
              value=""
              onChange={() => {}}
              placeholder="Descripción detallada del objetivo"
            />

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Responsable</p>
              <OkrTextInput
                label="Responsable"
                value=""
                onChange={() => {}}
                placeholder="Nombres y apellidos del colaborador"
              />
            </div>

            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="max-w-[100px]">Metrica mensual</p>
              <OkrTextInput
                label="Metrica mensual"
                value=""
                onChange={() => {}}
                placeholder="Nombre de la metrica mensual"
              />
            </div>

            <div className="text-[14px]">
              {/* Primer bloque (lectura) */}
              <div className="bg-red-100 mb-3 py-2 px-5 rounded-[12px]">
                <div className="grid grid-cols-6 gap-2 items-center">
                  <div className="col-span-1">Métrica</div>
                  <div className="col-span-1">Valor actual</div>
                  <div className="col-span-1">Valor esperado</div>
                  <div className="col-span-1">Porcentaje</div>
                  <div className="col-span-2">Barra de progreso </div>
                </div>
              </div>

              {/* Segundo bloque (edición con inputs) */}
              <div className="border border-neutral-300 mb-3 py-2 px-5 rounded-[12px]">
                <div className="grid grid-cols-6 gap-2 items-center">
                  <input
                    type="text"
                    placeholder="Métrica"
                    className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="Valor actual"
                    className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="Valor esperado"
                    className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <input
                    type="text"
                    placeholder="%"
                    className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  />
                  <div className="col-span-2">
                    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                      {/* Aquí podrías renderizar una barra dinámica en base al input si quieres */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ModalLayout>
      )}
    </div>
  );
}
