"use client";
import { useState, useEffect } from "react";
import { DataServer } from "@/client/components/shared/icons/DataServer";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrFormModal } from "@/client/components/private/okrs/OkrFormModal";
import { OkrCard } from "@/client/components/private/okrs/OkrCard";
import { useQuery } from "@apollo/client";
import { GET_OKRS_QUERY } from "@/client/services/okrs";

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [okrs, setOkrs] = useState<okrProps[]>([]);
  const [filteredOkrs, setFilteredOkrs] = useState<okrProps[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [startDateFilter, setStartDateFilter] = useState<string>("");
  const [endDateFilter, setEndDateFilter] = useState<string>("");

  const { data, loading, error } = useQuery(GET_OKRS_QUERY);

  useEffect(() => {
    if (data?.getOKRs) {
      setOkrs(data.getOKRs);
      setFilteredOkrs(data.getOKRs);
    }
  }, [data]);

  useEffect(() => {
    let result = [...okrs];

    // Función para convertir fecha de formato DD-MM-YYYY a Date
    const parseCustomDate = (dateString: string) => {
      if (!dateString) return null;
      const [day, month, year] = dateString.split('-').map(Number);
      return new Date(year, month - 1, day);
    };

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
    <div className="pt-[60px] my-6 mx-8 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="w-full">
          <p className="text-[36px] font-[600] mb-2">OKRs</p>
          <p>Gestión de objetivos para alinear y dar seguimiento a las metas de la empresa.</p>
        </div>
        <div className="w-full flex justify-center lg:justify-end">
          <MainButton text="Agregar nuevo OKR" handleClick={() => setIsModalOpen(true)} />
        </div>
      </div>

      {/** Filtros */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <select
            id="status-filter"
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
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
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto">
          <input
            type="date"
            id="end-date"
            className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
      </div>

      {isModalOpen && (
        <OkrFormModal
          handleSubmit={handleAddOkr}
          handleClose={() => setIsModalOpen(false)}
        />
      )}

      {filteredOkrs.length === 0 ? (
        <div className="min-h-[450px] flex flex-col justify-center items-center gap-4 border border-neutral-3 rounded-[24px]">
          <DataServer />
          <p>No data to show</p>
        </div>
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
