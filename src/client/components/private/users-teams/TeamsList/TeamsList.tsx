import { useState } from "react"

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
  teams
}:Readonly<{
  teams:TeamProps[];
}>) => {

  return(
    <div className="text-[12px]">
        <div className="px-2 grid grid-cols-5 gap-0 bg-[#FFEAEA] text-black dark:text-white rounded-[12px] mb-4 font-bold">
          <div className="col-span-1 p-2">Nombre del equipo</div>
          <div className="col-span-1 p-2">Descripción</div>
          <div className="col-span-1 p-2">Lider</div>
          <div className="col-span-1 p-2">Estado</div>
          <div className="col-span-1 p-2">Opciones</div>
        </div>

        {teams.map((team, idx) => (
          <div className="px-2 grid grid-cols-5 gap-0 border border-neutral-3 text-black dark:text-white rounded-[12px] mb-4" key={idx}>
            <div className="col-span-1 p-2">{team.name}</div>
            <div className="col-span-1 p-2">{team.description}</div>
            <div className="col-span-1 p-2">{team.manager.userId.name}</div>
            <div className="col-span-1 p-2">{team.status}</div>
            <div className="col-span-1 p-2">
              <button className="px-4 cursor-pointer">Editar</button>
              <button className="px-4 cursor-pointer">Eliminar</button>
            </div>
            
          </div>
        ))}  
      </div>
  )
}