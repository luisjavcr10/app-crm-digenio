"use client";
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { TitleSection } from "@/client/components/shared/TitleSection";
import { NoData } from "@/client/components/shared/NoData";
import { FOLLOW_UP_OKRS_QUERY } from "@/client/services/okrs";
import { TagForStatus } from "@/client/components/shared/TagForStatus";
import type { OkrStatus } from "@/client/types/okr";

interface OkrsFollowUpProps {
  id: string;
  name: string;
  status: OkrStatus;
  startups: {
    id: string;
    name: string;
    status: string;
    sprints: {
      status: string;
      modules: {
        status: string;
      }[];
    }[];
  }[];
}

export default function FollowUp() {
  const [okrs, setOkrs] = useState<OkrsFollowUpProps[]>([]);
  const { data } = useQuery(FOLLOW_UP_OKRS_QUERY);
  console.log(okrs);

  useEffect(() => {
    if (data?.noDraftOkrs) {
      setOkrs(data.noDraftOkrs);
    }
  }, [data]);

  // Función para calcular el porcentaje promedio de progreso de los sprints
  const calculateAverageProgress = (startup: OkrsFollowUpProps['startups'][0]) => {
    if (!startup.sprints || startup.sprints.length === 0) return 0;
    
    const sprintProgressPercentages = startup.sprints.map(sprint => {
      const totalModules = sprint.modules?.length || 0;
      const completedModules = sprint.modules?.filter(module => module.status === 'COMPLETED').length || 0;
      return totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
    });
    
    const averageProgress = sprintProgressPercentages.reduce((sum, percentage) => sum + percentage, 0) / sprintProgressPercentages.length;
    return Math.round(averageProgress);
  };

  return (
    <div className="h-full my-6 mx-8 flex flex-col gap-8 overflow-x-auto">
      <TitleSection
        name="SEGUIMIENTO"
        description="Seguimiento visual de objetivos estratégicos en conjunto con las startups participantes."
      />

      
        {okrs.length === 0 ? (
            <NoData />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {okrs.map((okr) => (
            <div key={okr.id} className="flex border border-neutral-3  rounded-[12px]">
              <div className="">
                <div className="flex flex-col gap-2 border-b border-neutral-3 p-3">
                  <p className="">{okr.name}</p>
                  <TagForStatus status={okr.status} />
                </div>
                <div className="p-3">
                  {okr.startups.length === 0
                    ? <p className="text-[12px] text-center text-neutral-3">Aún no hay startups registradas para lograr este objetivo. 📢</p>
                    : okr.startups.map((startup) => {
                        const progressPercentage = startup.status === 'IN_PROGRESS' ? calculateAverageProgress(startup) : null;
                        return (
                          <div key={startup.id} className="flex justify-between items-center text-neutral-6 dark:text-neutral-4 mb-1">
                            <span>{startup.name}</span>
                            {progressPercentage !== null && (
                              <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
                                {progressPercentage}%
                              </span>
                            )}
                          </div>
                        );
                      })}
                </div>
              </div>
              <div className="p-3 flex flex-col justify-center items-center border-l border-neutral-3 min-w-[120px]">
                {okr.startups.length === 0 ? (
                  <p className="text-center text-[12px] text-neutral-3">Sin startups 📂</p>
                ) : (
                  <div className="text-center">
                    <p className="text-[10px] text-neutral-2 mb-1">Startups</p>
                    <p className="text-lg font-semibold text-neutral-6">{okr.startups.length}</p>
                    {okr.startups.some(startup => startup.status === 'IN_PROGRESS') && (
                      <div className="flex gap-2">
                      <div>
                        <p className="text-[10px] text-neutral-2 mb-1 mt-2">En progreso</p>
                        <p className="text-sm text-blue-600">
                          {okr.startups.filter(startup => startup.status === 'IN_PROGRESS').length}
                        </p>
                        
                        </div>
                        <div>
                          <p className="text-[10px] text-neutral-2 mb-1 mt-2">Progreso promedio</p>
                        <p className="text-[10px] text-green-600">
                          {Math.round(
                            okr.startups
                              .filter(startup => startup.status === 'IN_PROGRESS')
                              .reduce((sum, startup) => sum + calculateAverageProgress(startup), 0) /
                            okr.startups.filter(startup => startup.status === 'IN_PROGRESS').length
                          )}%
                        </p>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
          </div>
        )}
      
    </div>
  );
}
