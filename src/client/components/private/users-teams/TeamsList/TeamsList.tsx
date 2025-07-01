import { useState } from "react"
import { ModalEditTeam } from "../ModalEditTeam";

interface UserProps {
  id:string;
  position: string;
  department: string;
  skills: string[];
  hireDate:string;
  userId:{
    name:string;
    email:string;
    status:string;
  };
  teams:{
    id:string;
    name:string
  }[];
  contactInfo:{
    phone:string;
    emergencyContact:string;
  }
}

interface TeamProps {
  id:string;
  name:string;
  description:string;
  status:string;
  manager:{
    userId:{
      name:string
    }
  };
  members :{
    userId:{
      name:string
    }
  }[];
}

export const TeamsList = ({
  teams,
  users
}:Readonly<{
  teams:TeamProps[];
  users:UserProps[]; // Agregamos users para poder seleccionar managers
}>) => {
  const [isModalEditTeamOpen, setIsModalEditTeamOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamProps | null>(null);
  const [teamsList, setTeamsList] = useState<TeamProps[]>(teams);

  const handleEditTeam = (team: TeamProps) => {
    setSelectedTeam(team);
    setIsModalEditTeamOpen(true);
  };

  const handleSaveTeam = (updatedTeam: TeamProps) => {
    setTeamsList(prevTeams => 
      prevTeams.map(team => 
        team.id === updatedTeam.id ? updatedTeam : team
      )
    );
    setIsModalEditTeamOpen(false);
    setSelectedTeam(null);
  };

  const handleCloseModal = () => {
    setIsModalEditTeamOpen(false);
    setSelectedTeam(null);
  };

  return(
    <div className="text-[12px]">
        <div className="px-2 grid grid-cols-5 gap-0 bg-[#FFEAEA] text-black dark:text-white rounded-[12px] mb-4 font-bold">
          <div className="col-span-1 p-2">Nombre del equipo</div>
          <div className="col-span-1 p-2">Descripción</div>
          <div className="col-span-1 p-2">Lider</div>
          <div className="col-span-1 p-2">Estado</div>
          <div className="col-span-1 p-2">Opciones</div>
        </div>

        {teamsList.map((team) => (
          <div className="px-2 grid grid-cols-5 gap-0 border border-neutral-3 text-black dark:text-white rounded-[12px] mb-4" key={team.id}>
            <div className="col-span-1 p-2">{team.name}</div>
            <div className="col-span-1 p-2">{team.description}</div>
            <div className="col-span-1 p-2">{team.manager.userId.name}</div>
            <div className="col-span-1 p-2">{team.status}</div>
            <div className="col-span-1 p-2">
              <button 
                onClick={() => handleEditTeam(team)} 
                className="px-4 cursor-pointer"
              >
                Editar
              </button>
              <button className="px-4 cursor-pointer">Eliminar</button>
            </div>
          </div>
        ))}

        {isModalEditTeamOpen && selectedTeam && (
          <ModalEditTeam 
            team={selectedTeam} 
            users={users}
            onClose={handleCloseModal}
            onSave={handleSaveTeam}
          />
        )}
    </div>
  )
}