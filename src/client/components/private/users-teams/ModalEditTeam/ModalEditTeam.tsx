import { useState } from "react";
import { TextInput, TextareaInput } from "../../../shared/formElements";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { TeamProps, UserProps } from "@/app/(modules)/users-teams/types";

export const ModalEditTeam = ({
  team,
  users,
  onClose,
  onSave
}:Readonly<{
  team: TeamProps;
  users: UserProps[];
  onClose: () => void;
  onSave: (team: TeamProps) => void;
}>) => {
  const [teamLocal, setTeamLocal] = useState<TeamProps>(team);

  const handleEdit = () => {
    // Llamamos a onSave con el equipo modificado
    onSave(teamLocal);
  };

  const handleManagerChange = (managerId: string) => {
    const selectedUser = users.find(user => user.id === managerId);
    if (selectedUser) {
      setTeamLocal({
        ...teamLocal,
        manager: {
          userId: {
            name: selectedUser.userId.name
          }
        }
      });
    }
  };

  return(
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-[#1f1f1f80]" onClick={onClose} />

      <div className="w-9/12 max-h-11/12 lg:max-h-9/12 overflow-y-auto bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[12px] relative z-10">
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
          <h2 className="text-[24px] lg:text-[32px] font-[600]">
            Editar equipo
          </h2>
        </div>

        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Nombre</p>
            <TextInput
              label="Nombre"
              value={teamLocal.name}
              onChange={(value) =>
                setTeamLocal({
                  ...teamLocal,
                  name: value,
                })
              }
              placeholder="Nombre completo del equipo"
              disabled={false}
            />
            <p className="min-w-[100px]">Estado</p>
            <select
              name="estado"
              className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
              value={teamLocal.status}
              onChange={(e) =>
                setTeamLocal({
                  ...teamLocal,
                  status: e.target.value,
                })
              }
            >
              <option value="active">Activo</option>
              <option value="inactive">Inactivo</option>
              <option value="pending">Pendiente</option>
            </select>
          </div>
          
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Líder</p>
            <select
              name="lider"
              className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
              value={teamLocal.manager.userId.name}
              onChange={(e) => {
                const selectedUser = users.find(user => user.userId.name === e.target.value);
                if (selectedUser) {
                  handleManagerChange(selectedUser.id);
                }
              }}
            >
              <option value="" disabled>Seleccione un líder de equipo</option>
              {users.map((user) => (
                <option key={user.id} value={user.userId.name}>
                  {user.userId.name}
                </option>
              ))}
            </select>
          </div>

          <div className="flex flex-col gap-2">
            <p className="min-w-[100px]">Descripción</p>
            <TextareaInput
              label="Descripción"
              value={teamLocal.description}
              onChange={(value) =>
                setTeamLocal({
                    ...teamLocal,
                    description: value,
                  })
              }
              placeholder="Descripción detallada del equipo"
              disabled={false}
            />
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