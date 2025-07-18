"use client";
//hooks
import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { useUsersModalStore } from "@/client/store/modalsStore";
//types
import { UserProps, TeamProps } from "./types";
//services
import { EMPLOYEES, TEAMS } from "@/client/services/employees";
//components
import { SwitchEntity, ModalCreateUT } from "@/client/components/private/users-teams";
import { UsersList } from "@/client/components/private/users-teams/usersComponents";
import { TeamsList } from "@/client/components/private/users-teams/teamsComponents";
import { TitleSection } from "@/client/components/shared/TitleSection";
import { MainButton } from "@/client/components/shared/buttons/MainButton";

export default function Page (){
  //stores to handle modal state
  const openModal = useUsersModalStore((state) => state.open);
  const closeModal = useUsersModalStore((state) => state.close);
  const isOpenModal = useUsersModalStore((state) => state.isOpen);
  //responses from services
  const { data:teamsData, loading:loadingTeams, refetch:refetchTeams } = useQuery(TEAMS);
  const { data:employeesData, loading:loadingEmployees, refetch:refetchEmployees } = useQuery(EMPLOYEES);
  //states to save responses
  const [users, setUsers] = useState<UserProps[]>([]);
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [entity, setEntity] = useState<"users" | "teams">("users");

  //effectos to update states
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

  //functions to refetch the list of an entity
  const refetchEntities = async () =>{
    try {
      await Promise.all([
        refetchEmployees(),
        refetchTeams()
      ]);
    } catch (error) {
      console.error('Error al actualizar los datos:', error);
    }
  }

  //handler to close the modal and refetch the list
  const handleCloseCreateModalWithSave = async () =>{
    closeModal();
    await refetchEntities()
  }

  return(
    <div className="w-full h-[calc(100%-40px)] mt-6 mb-2 mx-8 flex flex-col gap-8 overflow-y-auto">
      <TitleSection 
        name="USUARIOS Y EQUIPOS" 
        description="Visualización de usuarios, sus cargos, equipos y métricas de satisfacción (NPS)."
      >
        <MainButton 
          text="Agregar nuevo usuario/equipo" 
          handleClick={openModal} 
        />
      </TitleSection>

      {/**<div className="bg-nps h-[20px] w-full rounded-[12px] relative">
        <VscTriangleUp className="absolute top-[75%] left-[80%] translate-x-[-50%] translate-y-[-50%] text-neutral-1" />
      </div>*/}


      <SwitchEntity 
          entity={entity}
          click1={() => setEntity("users")}
          click2={() => setEntity("teams")}
        />

      {isOpenModal && (
        <ModalCreateUT mode="create" handleClose={closeModal} handleSave={handleCloseCreateModalWithSave} />
      )}

      {
        entity === "users" 
        ? 
          <UsersList refetch={refetchEntities} loading={loadingEmployees} users={users} /> 
        :
          <TeamsList refetch={refetchEntities}  loading={loadingTeams} teams={teams} />
      }
    </div>
  )
}