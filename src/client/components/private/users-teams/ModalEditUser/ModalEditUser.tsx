import { useState } from "react";
import { OkrTextInput } from "../../okrs/OkrTextInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { TeamProps, UserProps } from "@/app/(modules)/users-teams/types";

export const ModalEditUser = ({
  user,
  teams,
  onClose,
  onSave
}:Readonly<{
  teams:TeamProps[];
  user:UserProps;
  onClose: ()=>void;
  onSave: (user: UserProps) => void;
}>) =>{
  const [userLocal, setUserLocal] = useState<UserProps>(user);

  const handleEdit = () =>{
    // Llamamos a onSave con el usuario modificado
    onSave(userLocal);
  }

  return(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-[#1f1f1f80]" onClick={onClose} />

      <div className="w-9/12 max-h-11/12 lg:max-h-9/12 overflow-y-auto bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[12px] relative z-10">
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
          <h2 className="text-[24px] lg:text-[32px] font-[600]">
            Editar usuario
          </h2>
        </div>

        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Nombres</p>
                <OkrTextInput
                  label="Nombres"
                  value={userLocal.userId.name}
                  onChange={(value) =>
                    setUserLocal({
                      ...userLocal,
                      userId: { ...userLocal.userId, name: value },
                    })
                  }
                  placeholder="Nombre completo del colaborador"
                  disabled={false}
                />
                <p className="min-w-[100px]">Correo</p>
                <OkrTextInput
                  label="correo"
                  value={userLocal.userId.email}
                  onChange={(value) =>
                    setUserLocal({
                      ...userLocal,
                      userId: { ...userLocal.userId, email: value },
                    })
                  }
                  placeholder="Correo electronico del colaborador"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Area</p>
                <OkrTextInput
                  label="area"
                  value={userLocal.department}
                  onChange={(value) => setUserLocal({ ...userLocal, department: value })}
                  placeholder="Area"
                  disabled={false}
                />
                <p className="min-w-[100px]">Posición</p>
                <OkrTextInput
                  label="posicion"
                  value={userLocal.position}
                  onChange={(value) => setUserLocal({ ...userLocal, position: value })}
                  placeholder="Posicion"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Telefono</p>
                <OkrTextInput
                  label="telefono"
                  value={userLocal.contactInfo.phone}
                  onChange={(value) =>
                    setUserLocal({
                      ...userLocal,
                      contactInfo: { ...userLocal.contactInfo, phone: value },
                    })
                  }
                  placeholder="Telefono"
                  disabled={false}
                />
                <p className="min-w-[100px]">Equipo</p>
                <select
                  name="equipo"
                  className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
                  value={userLocal.teams?.[0]?.id || ""}
                  onChange={(e) => {
                    const selectedTeam = teams.find(team => team.id === e.target.value);
                    setUserLocal({ 
                      ...userLocal, 
                      teams: selectedTeam ? [selectedTeam] : [] 
                    });
                  }}
                >
                  <option value="" disabled>Selecciona un equipo</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </select>
              </div>
        </div>
        <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
          <MainButton 
            text="Guardar cambios" 
            handleClick={handleEdit} 
            disabled={false}
          />
        </div>
      </div>  
    </div>
  )
}