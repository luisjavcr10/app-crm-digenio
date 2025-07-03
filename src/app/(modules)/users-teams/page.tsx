"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { UsersList } from "@/client/components/private/users-teams/UsersList";
import { TeamsList } from "@/client/components/private/users-teams/TeamsList";
import { SwitchEntity } from "@/client/components/private/users-teams/SwitchEntity";
import { ModalCreateUT } from "@/client/components/private/users-teams/ModalCreateUT";
import { TitleSection } from "@/client/components/shared/TitleSection/TitleSection";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { EMPLOYEES, TEAMS } from "@/client/services/employees";
import { UserProps, TeamProps } from "./types";
import { VscTriangleUp } from "react-icons/vsc";

export default function Page (){
  const { data:teamsData, loading:loadingTeams, refetch:refetchTeams } = useQuery(TEAMS);
  const { data:employeesData, loading:loadingEmployees, refetch:refetchEmployees } = useQuery(EMPLOYEES);
  const [users, setUsers] = useState<UserProps[]>([]);
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [entity, setEntity] = useState<"users" | "teams">("users");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    if(employeesData){
      setUsers(employeesData.employees);
    }
  }, [employeesData])

  useEffect(() => {
    if(teamsData){
      setTeams(teamsData.teams);
    }
  }, [teamsData])

  const handleCloseCreateModalWithSave = async () =>{
    setIsOpen(false);
    try {
      await Promise.all([
        refetchEmployees(),
        refetchTeams()
      ]);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  }

  return(
    <div className="my-6 mx-8 flex flex-col gap-8 overflow-x-auto">
      <TitleSection 
        name="USUARIOS Y EQUIPOS" 
        description="Visualización de usuarios, sus cargos, equipos y métricas de satisfacción (NPS)."
      >
        <MainButton 
          text="Agregar nuevo usuario/equipo" 
          handleClick={()=>setIsOpen(true)} 
        />
      </TitleSection>

      <div className="h-[20px] w-full bg-nps rounded-[12px] relative">
        <VscTriangleUp className="absolute top-[75%] left-[80%] translate-x-[-50%] translate-y-[-50%] text-neutral-1" />
      </div>


      <SwitchEntity 
          entity={entity}
          click1={() => setEntity("users")}
          click2={() => setEntity("teams")}
        />

      {isOpen && (
        <ModalCreateUT mode="create" handleClose={()=>setIsOpen(false)} handleSave={handleCloseCreateModalWithSave} />
      )}

      {
        entity === "users" 
        ? 
          <UsersList loading={loadingEmployees} teams={teams} users={users} /> 
        :
          <TeamsList loading={loadingTeams} users={users} teams={teams} />
      }
    </div>
  )
}