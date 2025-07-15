import { useState } from "react";
import { StartupModal } from "../StartupModal/StartupModal";
import { ApolloQueryResult } from "@apollo/client";
import { CircleTargetIcon } from "@/client/components/shared/icons";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { ModalTitle } from "@/client/components/shared/modal";
import { ModalLayout } from "@/client/components/shared/modal";

interface IStartup {
  _id: string;
  name: string;
  description: string;
  okrId: {
    _id: string;
    name: string;
  };
  teamId: {
    _id: string;
    name: string;
  };
  status: string;
  observation?: string;
  sprints: {
    orderNumber: number;
    name: string;
    deliverable?: string;
    startDate?: string;
    endDate?: string;
    status: string;
    modules: {
      name: string;
      task: string;
      responsible: {
        _id: string;
        name: string;
      };
      status: string;
      deadline?: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}
export const StartupCard = ({
  st,
  refetch,
}: Readonly<{
  st: IStartup;
  refetch: () => Promise<ApolloQueryResult<{ getAllStartups: IStartup[] }>>;
}>) => {
  const [showModal, setShowModal] = useState(false);
  const [modalObservation, setModalObservation] = useState<boolean>(false);
  console.log(st);
  
  const getStatusInfo = (status: string) => {
    switch (status) {
      case "IDEA_PENDING_REVIEW":
        return { label: "Idea en revisión", color: "bg-neutral-2" };
      case "IDEA_APPROVED":
        return { label: "Idea aprovada", color: "bg-alert-yellow" };
      case "IDEA_OBSERVED":
        return { label: "Idea observada", color: "bg-orange-300" };
      case "IDEA_REJECTED":
        return { label: "Idea rechazada", color: "bg-alert-red" };
      case "IN_PROGRESS":
        return { label: "En Progreso", color: "bg-alert-green" };
      case "PAUSED":
        return { label: "Pausado", color: "bg-alert-orange" };
      case "COMPLETED":
        return { label: "Completado", color: "bg-blue-600" };
      case "CANCELLED":
        return { label: "Cancelado", color: "bg-red-500" };
      default:
        return { label: "Desconocido", color: "bg-gray-500" };
    }
  };
  
  const statusInfo = getStatusInfo(st.status);

  return (
    <div>
      <div
        onClick={() => setShowModal(true)}
        className="py-3 px-5 flex gap-2  items-start justify-between border-y border-x border-neutral-3 dark:border-neutral-2 rounded-t-[12px] cursor-pointer hover:scale-[1.02] hover:rounded-b-[12px] hover:bg-neutral-4 origin-bottom transition-all duration-200 ease-out"
      >
        <p className="text-[16px]">{st.name}</p>
        <div className="flex items-center gap-2 bg-neutral-4 dark:bg-neutral-2 rounded-[12px] border border-neutral-3 text-[12px] px-2 w-fit">
          <span className="relative flex size-2">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full ${statusInfo.color} opacity-75`}
            ></span>
            <span
              className={`relative inline-flex size-2 rounded-full ${statusInfo.color}`}
            ></span>
          </span>
          <p className="text-[12px]">{statusInfo.label}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 px-5 py-2 border-x border-b border-neutral-3 text-[12px]">
        <p><strong>Objetivo:</strong> {st.okrId.name}</p>
        <p><strong>Equipo:</strong> {st.teamId.name}</p>
        {st.sprints.map((sprint, index)=>(
          <div key={index} className="flex gap-1 justify-start items-center mb-2">
            <CircleTargetIcon /> 
            <p> {sprint.name}</p>
          </div>
        ))}
      </div>

      <div className="border-b border-x border-neutral-3 dark:border-neutral-2 rounded-b-[12px] py-3 px-5 text-[12px] space-y-1">
        <div className=" text-center">
          {st.status === 'IDEA_PENDING_REVIEW' && 
            <p className="text-neutral-3">
              En espera de revisión
            </p>
          }
          {st.status === 'IDEA_APPROVED' && <p>Idea aprobada</p>}
          {st.status === 'IDEA_OBSERVED' && 
            <>
              <MainButton text="Ver observaciones" handleClick={()=>{setModalObservation(true)}}/>
              {modalObservation && (
                <ModalLayout onClose={()=>{setModalObservation(false)}}>
                  <ModalTitle text="Observaciones" onClose={()=>{setModalObservation(false)}}/>
                  <div className="py-4 px-8 flex flex-col justify-center items-start gap-6">
                    <div className="border border-neutral-3 rounded-[12px] p-2 text-start">
                      {st.observation}
                    </div>
                    <p className="text-neutral-3">📌 Dispone de un plazo de 72 horas para subsanar las observaciones. Transcurrido este tiempo sin correcciones, el registro será rechazado.</p>
                  </div>
                </ModalLayout>
              )}
            </>
          }
          {st.status === 'IDEA_REJECTED' && <p>Lamentamos informar que la idea del startup ha sido rechazada. 😢</p>}
          {st.status === 'IN_PROGRESS' && <p>En progreso</p>}
          {st.status === 'COMPLETED' && <p>Completado</p>}
        </div>
      </div>

      {showModal && (
        <StartupModal
          startup={st}
          handleClose={() => setShowModal(false)}
          refetch={refetch}
        />
      )}
    </div>
  );
};
