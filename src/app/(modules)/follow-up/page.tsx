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
                    : okr.startups.map((startup) => (
                        <div key={startup.id} className="text-neutral-6 dark:text-neutral-4 mb-1">{startup.name}</div>
                      ))}
                </div>
              </div>
              <div className="p-3 flex justify-center items-center border-l border-neutral-3">
                <p className="text-center text-[12px] text-neutral-3">Aún no hay data para mostrar en este objetivo. 📂</p>
                
              </div>
            </div>
          ))}
          </div>
        )}
      
    </div>
  );
}
