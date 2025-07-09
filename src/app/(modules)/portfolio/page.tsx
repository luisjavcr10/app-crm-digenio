"use client";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { GET_ALL_STARTUPS_QUERY } from "@/client/services/startups";
import { StartupCard } from "@/client/components/private/portfolio/StartupCard";
import { StartupModal } from "@/client/components/private/portfolio/StartupModal";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { TitleSection } from "@/client/components/shared/TitleSection";
import { NoData } from "@/client/components/shared/NoData";
import { useStartupModalStore } from "@/client/store/modalsStore";

interface IStartup {
  _id: string;
  client: string;
  name: string;
  description: string;
  responsible: string;
  monthlyMetric: string;
  metric: string;
  currentValue: number;
  expectedValue: number;
  createdAt: string;
  updatedAt: string;
}

export default function PortfolioPage() {
  const openModal = useStartupModalStore((state) => state.open);
  const closeModal = useStartupModalStore((state) => state.close);
  const isOpenModal = useStartupModalStore((state) => state.isOpen);

  const { data, refetch } = useQuery<{
    getAllStartups: IStartup[];
  }>(GET_ALL_STARTUPS_QUERY);

  const [stageFilter, setStageFilter] = useState("all");

  const startups = data?.getAllStartups || [];
  
  const filteredStartups = startups.filter((s) => {
    const percentage =
      s.expectedValue === 0 ? 0 : (s.currentValue / s.expectedValue) * 100;
  
    if (stageFilter === "idea") return percentage === 0;
    if (stageFilter === "crecimiento") return percentage > 0 && percentage < 100;
    if (stageFilter === "escala") return percentage === 100;
    return true;
  });

  return (
    <div className="h-full my-6 mx-8 flex flex-col gap-8 ">
      <TitleSection
        name="Portafolio de startups"
        description="Registro y monitoreo de los proyectos o productos que contribuyen al cumplimiento de los objetivos."
      >
        <MainButton
          text="Agregar nueva startup"
          handleClick={openModal}
        />
      </TitleSection>

      <div className="flex flex-col md:flex-row gap-4 items-start md:items-end">
        <div className="flex flex-col gap-2 w-full md:w-auto">
          <select
            id="stage-filter"
            className="px-4 py-2 border border-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 text-[12px] text-neutral-3"
            value={stageFilter}
            onChange={(e) => setStageFilter(e.target.value)}
          >
            <option value="all">Todas las etapas</option>
            <option value="idea">Idea</option>
            <option value="crecimiento">Crecimiento</option>
            <option value="escala">Escala</option>
          </select>
        </div>
      </div>

      {filteredStartups.length === 0 ? (
        <NoData />
      ) : (
        <div className="min-h-[450px] grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 md:hidden">
            {filteredStartups.map((startup) => (
              <StartupCard key={startup._id} st={startup} refetch={refetch} />
            ))}
          </div>
          {[0, 1, 2].map((colIndex) => (
            <div key={colIndex} className="hidden md:flex flex-col gap-4">
              {filteredStartups
                .filter((_, index) => index % 3 === colIndex)
                .map((startup) => (
                  <StartupCard
                    key={startup._id}
                    st={startup}
                    refetch={refetch}
                  />
                ))}
            </div>
          ))}
        </div>
      )}

      {isOpenModal && (
        <>
          <StartupModal
            handleClose={closeModal}
            refetch={refetch}
          />
        </>
      )}
    </div>
  );
}
