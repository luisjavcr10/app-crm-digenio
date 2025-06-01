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
}

const okrsList = [
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Elevar la calidad del software entregado, reduciendo defectos críticos en producción y fortaleciendo los procesos de validación.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion:
      "Optimizar de manera significativa el flujo de trabajo del equipo de desarrollo backend mediante la implementación de metodologías ágiles combinadas con herramientas de integración continua y entrega continua (CI/CD), permitiendo la automatización de pruebas y facilitando la integración rápida y fiable de nuevos cambios de código. Este enfoque tiene como objetivo mejorar la productividad global del equipo, reducir considerablemente los tiempos de entrega, y asegurar que cada sprint proporcione valor de manera consistente y con un nivel de calidad alto en cada iteración.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Crear una infraestructura de ciberseguridad robusta que se integre completamente en el proceso de desarrollo y despliegue del software, asegurando que todos los productos y sistemas cuenten con políticas de seguridad desde la fase de diseño hasta la de mantenimiento. Esto incluye la implementación de controles de acceso basados en roles, encriptación de datos en tránsito y reposo, auditorías de seguridad regulares, formación continua en mejores práct",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Elevar la calidad del software entregado, reduciendo defectos críticos en producción y fortaleciendo los procesos de validación.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion:
      "Optimizar de manera significativa el flujo de trabajo del equipo de desarrollo backend mediante la implementación de metodologías ágiles combinadas con herramientas de integración continua y entrega continua (CI/CD), permitiendo la automatización de pruebas y facilitando la integración rápida y fiable de nuevos cambios de código. Este enfoque tiene como objetivo mejorar la productividad global del equipo, reducir considerablemente los tiempos de entrega, y asegurar que cada sprint proporcione valor de manera consistente y con un nivel de calidad alto en cada iteración.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Crear una infraestructura de ciberseguridad robusta que se integre completamente en el proceso de desarrollo y despliegue del software, asegurando que todos los productos y sistemas cuenten con políticas de seguridad desde la fase de diseño hasta la de mantenimiento. Esto incluye la implementación de controles de acceso basados en roles, encriptación de datos en tránsito y reposo, auditorías de seguridad regulares, formación continua en mejores práct",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Elevar la calidad del software entregado, reduciendo defectos críticos en producción y fortaleciendo los procesos de validación.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion:
      "Optimizar de manera significativa el flujo de trabajo del equipo de desarrollo backend mediante la implementación de metodologías ágiles combinadas con herramientas de integración continua y entrega continua (CI/CD), permitiendo la automatización de pruebas y facilitando la integración rápida y fiable de nuevos cambios de código. Este enfoque tiene como objetivo mejorar la productividad global del equipo, reducir considerablemente los tiempos de entrega, y asegurar que cada sprint proporcione valor de manera consistente y con un nivel de calidad alto en cada iteración.",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
  {
    nombresResponsable: "Luis Castillo",
    nombreEquipo: "Equipo de desarrollo",
    descripcion: "Crear una infraestructura de ciberseguridad robusta que se integre completamente en el proceso de desarrollo y despliegue del software, asegurando que todos los productos y sistemas cuenten con políticas de seguridad desde la fase de diseño hasta la de mantenimiento. Esto incluye la implementación de controles de acceso basados en roles, encriptación de datos en tránsito y reposo, auditorías de seguridad regulares, formación continua en mejores práct",
    fechaInicio: "2023-01-01",
    fechaFin: "2023-06-01",
  },
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
