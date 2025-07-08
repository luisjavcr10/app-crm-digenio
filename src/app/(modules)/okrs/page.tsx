"use client";
import { useState, useEffect } from "react";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrFormModal } from "@/client/components/private/okrs/OkrFormModal";
import { OkrCard } from "@/client/components/private/okrs/OkrCard";
import { useQuery } from "@apollo/client";
import { GET_OKRS_QUERY } from "@/client/services/okrs";
import { NoData } from "@/client/components/shared/NoData";
import { TitleSection } from "@/client/components/shared/TitleSection/TitleSection";
import { useOkrModalStore } from "@/client/store/modalsStore";

interface okrProps {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: string;
  startDate: string;
  endDate: string;
  userId: string;
}

export default function OkrsPage() {
  const openModal = useOkrModalStore((state) => state.open);
  const closeModal = useOkrModalStore((state) => state.close);
  const isOpenModal = useOkrModalStore((state) => state.isOpen);
  const [okrs, setOkrs] = useState<okrProps[]>([]);
  const [filteredOkrs, setFilteredOkrs] = useState<okrProps[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const { data } = useQuery(GET_OKRS_QUERY);

  useEffect(() => {
    if (data?.getOKRs) {
      setOkrs(data.getOKRs);
      setFilteredOkrs(data.getOKRs);
    }
  }, [data]);

  useEffect(() => {
    let result = [...okrs];

    // Filtrar por estado
    if (statusFilter !== "all") {
      result = result.filter((okr) => okr.status === statusFilter);
    }

    // Filtrar por fecha de inicio
    if (startDateFilter) {
      const filterStartDate = new Date(startDateFilter);
      result = result.filter((okr) => {
        const okrStartDate = new Date(okr.startDate);
        return okrStartDate && okrStartDate >= filterStartDate;
      });
    }

    // Filtrar por fecha de fin
    if (endDateFilter) {
      const filterEndDate = new Date(endDateFilter);
      result = result.filter((okr) => {
        const okrEndDate = new Date(okr.endDate);
        return okrEndDate && okrEndDate <= filterEndDate;
      });
    }

    setFilteredOkrs(result);
  }, [statusFilter, startDateFilter, endDateFilter, okrs]);

  const handleAddOkr = (newOkr: okrProps) => {
    setOkrs([newOkr, ...okrs]);
    setFilteredOkrs([newOkr, ...filteredOkrs]);
  };

  return (
    <div className="my-6 mx-8 flex flex-col gap-8 overflow-x-auto">
      <TitleSection name="OKRs" description="Gestión de objetivos para alinear y dar seguimiento a las metas de la empresa.">
        <MainButton text="Agregar nuevo OKR" handleClick={openModal} />
      </TitleSection>

      {/** Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <select
            id="status-filter"
            className="px-4 py-2 border border-neutral-3 text-[12px] text-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Todos</option>
            <option value="Pending">Pendientes</option>
            <option value="Completed">Completados</option>
            <option value="In Progress">En progreso</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <input
            type="date"
            id="start-date"
            className="px-4 py-2 border border-neutral-3 text-[12px] text-neutral-3  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <input
            type="date"
            id="end-date"
            className="px-4 py-2 border border-neutral-3 text-[12px] text-neutral-3  rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
      </div>

      {isOpenModal && (
        <OkrFormModal
          handleSubmit={handleAddOkr}
          handleClose={closeModal}
        />
      )}

      {filteredOkrs.length === 0 ? (
        <NoData />
      ) : (
        <div className="min-h-[450px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 md:hidden">
            {filteredOkrs.map((okr, idx) => (
              <OkrCard key={idx} index={idx} okr={okr} />
            ))}
          </div>
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="hidden md:flex flex-col gap-4">
              {filteredOkrs
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
