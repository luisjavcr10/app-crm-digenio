"use client";
import { useState, useEffect, useCallback } from "react";
import { useQuery } from "@apollo/client";
import { GET_OKRS_QUERY } from "@/client/services/okrs";
import { useOkrModalStore } from "@/client/store/modalsStore";
import { useSidebarStore } from "@/client/store/sidebarStore";
import { useAuth } from "@/client/hooks/useAuth";
import type { OkrProps, OkrFilterStatus } from "@/client/types/okr";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrFormModal } from "@/client/components/private/okrs/OkrFormModal";
import { OkrCard } from "@/client/components/private/okrs/OkrCard";
import { NoData } from "@/client/components/shared/NoData";
import { TitleSection } from "@/client/components/shared/TitleSection";

/**
 * OKRs page component - Manages OKR listing, filtering, and creation
 */
export default function OkrsPage() {
  const { user } = useAuth();
  const { isOpen } = useSidebarStore((state) => state);

  // Modal states
  const openModal = useOkrModalStore((state) => state.open);
  const closeModal = useOkrModalStore((state) => state.close);
  const isOpenModal = useOkrModalStore((state) => state.isOpen);

  // Data states
  const [okrs, setOkrs] = useState<OkrProps[]>([]);
  const [filteredOkrs, setFilteredOkrs] = useState<OkrProps[]>([]);
  
  // Filter states
  const [statusFilter, setStatusFilter] = useState<OkrFilterStatus>('all');
  const [startDateFilter, setStartDateFilter] = useState<string>('');
  const [endDateFilter, setEndDateFilter] = useState<string>('');

  const { data } = useQuery(GET_OKRS_QUERY, {
    variables: { userId: user?.id },
    skip: !user?.id,
  });

  useEffect(() => {
    if (data?.okrs) {
      setOkrs(data.okrs);
      setFilteredOkrs(data.okrs);
    }
  }, [data]);

  /**
   * Filters OKRs based on status and date range
   */
  const filterOkrs = useCallback(() => {
    let result = [...okrs];

    // Filter by status
    if (statusFilter !== 'all') {
      result = result.filter((okr) => okr.status === statusFilter);
    }

    // Filter by start date
    if (startDateFilter) {
      const filterStartDate = new Date(startDateFilter);
      result = result.filter((okr) => {
        const okrStartDate = new Date(okr.startDate);
        return okrStartDate && okrStartDate >= filterStartDate;
      });
    }

    // Filter by end date
    if (endDateFilter) {
      const filterEndDate = new Date(endDateFilter);
      result = result.filter((okr) => {
        const okrEndDate = new Date(okr.endDate);
        return okrEndDate && okrEndDate <= filterEndDate;
      });
    }

    setFilteredOkrs(result);
  }, [okrs, statusFilter, startDateFilter, endDateFilter]);

  useEffect(() => {
    filterOkrs();
  }, [filterOkrs]);

  /**
   * Handles adding or updating an OKR in the list
   * @param okr - The OKR to add or update
   */
  const handleOkrSubmit = useCallback((okr: OkrProps) => {
    setOkrs((prevOkrs) => {
      const existingIndex = prevOkrs.findIndex((existingOkr) => existingOkr.id === okr.id);
      
      if (existingIndex >= 0) {
        // Update existing OKR
        const updatedOkrs = [...prevOkrs];
        updatedOkrs[existingIndex] = okr;
        return updatedOkrs;
      } else {
        // Add new OKR
        return [okr, ...prevOkrs];
      }
    });
  }, []);

  /**
   * Handles removing an OKR from the list
   * @param okrId - The ID of the OKR to remove
   */
  const handleOkrDelete = useCallback(async (okrId: string): Promise<void> => {
    setOkrs((prevOkrs) => prevOkrs.filter((okr) => okr.id !== okrId));
  }, []);

  return (
    <div className="w-full h-[calc(100%-40px)] mt-6 mb-2 mx-8 flex flex-col gap-8 overflow-y-auto">
      <TitleSection name="OKRs" description="Gestión de objetivos para alinear y dar seguimiento a las metas de la empresa.">
        {user.roles.includes("ADMIN") && <MainButton text="Agregar nuevo OKR" handleClick={openModal} />}
      </TitleSection>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <label htmlFor="status-filter" className="text-sm font-medium text-neutral-7 dark:text-neutral-3">
            Estado
          </label>
          <select
            id="status-filter"
            className="px-4 py-2 border border-neutral-3 text-[12px] text-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as OkrFilterStatus)}
          >
            <option value="all">Todos</option>
           {user.roles.includes("ADMIN") && <option value="draft">Borrador</option>}
            <option value="pending">Pendientes</option>
            <option value="completed">Completados</option>
            <option value="in_progress">En progreso</option>
          </select>
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto scheme-light dark:scheme-dark ">
          <label htmlFor="start-date" className="text-sm font-medium text-neutral-7 dark:text-neutral-3">
            Fecha de inicio
          </label>
          <input
            type="date"
            id="start-date"
            className="px-4 py-2 border border-neutral-3 text-[12px] text-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-2 w-full md:w-auto scheme-light dark:scheme-dark ">
          <label htmlFor="end-date" className="text-sm font-medium text-neutral-7 dark:text-neutral-3">
            Fecha de fin
          </label>
          <input
            type="date"
            id="end-date"
            className="px-4 py-2 border border-neutral-3 text-[12px] text-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </div>
      </div>

      {isOpenModal && (
        <OkrFormModal
          handleSubmit={handleOkrSubmit}
          handleClose={closeModal}
        />
      )}

      {filteredOkrs.length === 0 ? (
        <NoData />
      ) : (
        <div className={`min-h-[450px] m-2 grid grid-cols-1 md:grid-cols-2 ${isOpen ?'lg:grid-cols-2':'lg:grid-cols-3'} gap-4`}>
          {/* Mobile view - single column */}
          <div className="flex flex-col gap-4 md:hidden">
            {filteredOkrs.map((okr, index) => (
              <OkrCard 
                key={okr.id} 
                index={index} 
                okr={okr} 
                onUpdate={handleOkrSubmit}
                onDelete={handleOkrDelete}
              />
            ))}
          </div>
          
          {/* Desktop view - masonry layout */}
          {[0, 1, 2].map((colIndex) => (
            <div key={`column-${colIndex}`} className="hidden md:flex flex-col gap-4">
              {filteredOkrs
                .filter((_, index) => index % 3 === colIndex)
                .map((okr, index) => (
                  <OkrCard 
                    key={okr.id} 
                    index={index} 
                    okr={okr} 
                    onUpdate={handleOkrSubmit}
                    onDelete={handleOkrDelete}
                  />
                ))}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
