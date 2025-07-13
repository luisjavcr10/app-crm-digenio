import { useState } from "react";
import { useMutation } from "@apollo/client";
import { SOFTDELETE_TEAM } from "@/client/services/employees";
import { ModalEditTeam } from "../ModalEditTeam";
import { ModalShowTeam } from "../ModalShowTeam";
import { TeamProps } from "@/app/(modules)/users-teams/types";

export const TeamsList = ({
  teams,
  loading,
  refetch
}:Readonly<{
  teams:TeamProps[];
  loading:boolean;
  refetch: () => void;
}>) => {
  const [softDeleteTeam] =
    useMutation(SOFTDELETE_TEAM);
  const [isModalEditTeamOpen, setIsModalEditTeamOpen] = useState(false);
  const [isModalShowTeamOpen, setIsModalShowTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamProps | null>(null);

  //const handleEditTeam = (team: TeamProps) => {
  //  setSelectedTeam(team);
  //  setIsModalEditTeamOpen(true);
  //};

  const handleShowTeam = (team: TeamProps) => {
    setSelectedTeam(team);
    setIsModalShowTeamOpen(true);
  };

  const handleSaveTeam = () => {

  };

  const handleCloseEditModal = () => {
    setIsModalEditTeamOpen(false);
    setSelectedTeam(null);
  };

  const handleCloseShowModal = () => {
    setIsModalShowTeamOpen(false);
    setSelectedTeam(null);
  };

  const handleSoftDelete = async (id: string) =>{
    await softDeleteTeam({
      variables: {
        softDeleteTeamId: id,
      },
    });
    await refetch();
  }

  if(loading){
    return(
      <div className="text-[12px] text-center p-2 bg-neutral-4 text-black dark:text-white rounded-[12px] mb-4 font-bold">
        Cargando equipos...
      </div>
    )
  }

  return(
    <div className="text-[12px]">
        <div className="px-2 grid grid-cols-5 gap-0 bg-[#FFEAEA] text-black dark:text-white rounded-[12px] mb-4 font-bold">
          <div className="col-span-1 p-2">Nombre del equipo</div>
          <div className="col-span-1 p-2">Descripción</div>
          <div className="col-span-1 p-2">Lider</div>
          <div className="col-span-1 p-2">Estado</div>
          <div className="col-span-1 p-2">Opciones</div>
        </div>

        {teams.map((team) => (
          <div className="px-2 grid grid-cols-5 gap-0 border border-neutral-3 text-black dark:text-white rounded-[12px] mb-4" key={team.id}>
            <div className="col-span-1 p-2">{team.name}</div>
            <div className="col-span-1 p-2">{team.description}</div>
            <div className="col-span-1 p-2">{team.manager.userId.name}</div>
            <div className="col-span-1 p-2">{team.status}</div>
            <div className="col-span-1 p-2">
              <button 
                onClick={() => handleShowTeam(team)} 
                className="px-4 cursor-pointer"
              >
                Ver
              </button>
              <button 
                onClick={()=>handleSoftDelete(team.id)}
                className="px-4 cursor-pointer"
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {isModalEditTeamOpen && selectedTeam && (
          <ModalEditTeam 
            team={selectedTeam} 
            onClose={handleCloseEditModal}
            onSave={handleSaveTeam}
          />
        )}

        {isModalShowTeamOpen && selectedTeam && (
          <ModalShowTeam 
            team={selectedTeam} 
            onClose={handleCloseShowModal}
          />
        )}
    </div>
  )
}