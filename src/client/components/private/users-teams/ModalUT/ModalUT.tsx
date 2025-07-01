import { useState } from "react";
import { OkrTextInput } from "../../okrs/OkrTextInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";

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


export const ModalUT = ({
  teams,
  handleClose,
}: Readonly<{
  teams: TeamProps[];
  handleClose: () => void;
}>) => {
  const [entity, setEntity] = useState<"users" | "teams">("users");
  const [user, setUser] = useState(
    {
      position:"",
      department:"",
      skills:["TypeScript"],
      userId:{
        name:"",
        email:"",
      },
      teams:[
        {
          name:""
        }
      ],
      contactInfo:{
        phone:"",
        emergencyContact:"943721646"
      }
    }
  )

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-[#1f1f1f80]" onClick={handleClose} />

      <div className="w-9/12 max-h-11/12 lg:max-h-9/12 overflow-y-auto bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[12px] relative z-10">
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
          <h2 className="text-[24px] lg:text-[32px] font-[600]">
            Agregar nuevo usuario / equipo
          </h2>
        </div>

        <div className="px-6 py-4 flex gap-4 text-[12px]">
          <div
            onClick={() => setEntity("users")}
            className={`cursor-pointer px-3 py-1 rounded-[6px] border border-neutral-3 ${entity === "users" ? "bg-neutral-4" : ""}`}
          >
            Usuarios
          </div>

          <div
            onClick={() => setEntity("teams")}
            className={`cursor-pointer px-3 py-1 rounded-[6px] border border-neutral-3 ${entity === "teams" ? "bg-neutral-4" : ""}`}
          >
            Equipos
          </div>
        </div>

        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
          {entity === "users" ? (
            <>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Nombres</p>
              <OkrTextInput
                label="Nombres"
                value={user.userId.name}
                onChange={(value) => setUser({...user, userId:{...user.userId, name:value}})}
                placeholder="Nombre completo del colaborador"
                disabled={false}
              />
              <p className="min-w-[100px]">Correo</p>
              <OkrTextInput
                label="correo"
                value={user.userId.email}
                onChange={(value) => setUser({...user, userId:{...user.userId, email:value}})}
                placeholder="Correo electronico del colaborador"
                disabled={false}
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Area</p>
              <OkrTextInput
                label="area"
                value={user.department}
                onChange={(value) => setUser({...user, department:value})}
                placeholder="Area"
                disabled={false}
              />
              <p className="min-w-[100px]">Posición</p>
              <OkrTextInput
                label="posicion"
                value={user.position}
                onChange={(value) => setUser({...user, position:value})}
                placeholder="Posicion"
                disabled={false}
              />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Telefono</p>
              <OkrTextInput
                label="area"
                value={user.contactInfo.phone}
                onChange={(value) => setUser({...user, contactInfo:{...user.contactInfo, phone:value}})}
                placeholder="Area"
                disabled={false}
              />
              <p className="min-w-[100px]">Equipo</p>
              <select name="equipo" id="" className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
              value={user.teams[0].name}
              onChange={(e) => setUser({...user, teams:[{...user.teams[0], name:e.target.value}]})}
              >
                <option value="">Seleccione un equipo</option>
                {teams.map((team) => (
                  <option key={team.id} value={team.id}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            </>
          ) : (
            <></>
          )}
        </div>

        <div className="w-full py-4 px-6 flex justify-center items-center gap-4">
          <MainButton
            text="Guardar"
            handleClick={()=>console.log(user)}
          />
        </div>

      </div>
    </div>
  );
};
