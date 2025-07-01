"use client";

import { useState, useEffect } from "react";
import { TitleSection } from "@/client/components/shared/TitleSection/TitleSection";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { NoData } from "@/client/components/shared/NoData";
import { useQuery } from "@apollo/client";
import { EMPLOYEES, TEAMS } from "@/client/services/employees";
import { UsersList } from "@/client/components/private/users-teams/UsersList";
import { TeamsList } from "@/client/components/private/users-teams/TeamsList";
import { ModalUT } from "@/client/components/private/users-teams/ModalUT";

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

export default function Page (){
  const { data:teamsData } = useQuery(TEAMS);
  const { data:employeesData } = useQuery(EMPLOYEES);
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

  return(
    <div className="my-6 mx-8 flex flex-col gap-8 overflow-x-auto">
      <TitleSection name="USUARIOS Y EQUIPOS" description="Visualización de usuarios, sus cargos, equipos y métricas de satisfacción (NPS).">
        <MainButton text="Agregar nuevo usuario/equipo" handleClick={()=>setIsOpen(true)} />
      </TitleSection>


      <div className="flex gap-4 text-[12px]">
        <div onClick={()=>setEntity("users")} className={`cursor-pointer px-3 py-1 rounded-[6px] border border-neutral-3 ${entity ==="users"?'bg-neutral-4':''}`}>
          Usuarios
        </div>

        <div onClick={()=>setEntity("teams")} className={`cursor-pointer px-3 py-1 rounded-[6px] border border-neutral-3 ${entity ==="teams"?'bg-neutral-4':''}`}>
          Equipos
        </div>
      </div>

      {isOpen && (
        <ModalUT teams={teams} handleClose={()=>setIsOpen(false)} />
      )}


      {users.length===0 
      ?
        <NoData />
      :
        entity === "users" 
        ? 
          <UsersList users={users} /> 
        :
          <TeamsList teams={teams} />
      }
    </div>
  )
}