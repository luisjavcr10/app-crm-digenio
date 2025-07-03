import { useState, useEffect } from "react";
import { TextInput, TextareaInput } from "../../../shared/formElements";
import { useQuery, useMutation } from "@apollo/client";
import { ID_NAME_EMPLOYEES, CREATE_TEAM } from "@/client/services/employees";
import { EmployeeLigthProps } from "@/app/(modules)/users-teams/types";
import { MainButton } from "@/client/components/shared/buttons/MainButton";

export const TeamForm = ({
  handleSave,
}: Readonly<{
  handleSave: () => void;
}>) =>{
  const { data: employees } = useQuery(ID_NAME_EMPLOYEES);
  const [createTeam, { loading: loadingTeam }] = useMutation(CREATE_TEAM);
  const [employeesState, setEmployees] = useState<EmployeeLigthProps[]>([]);
  const [error, setError] = useState<string>("");
    const [team, setTeam] = useState({
    name: "",
    description: "",
    managerId: "",
  });
    useEffect(() => {
    if(employees){
      setEmployees(employees.employees);
    }
  }, [employees]);

   const handleCreateTeam = async () => {
    setError("");
    if (team.name === "") {
      setError("El nombre es requerido");
      return;
    }
    if (team.description === "") {
      setError("La descripción es requerida");
      return;
    }
    if (team.managerId === "") {
      setError("El gerente es requerido");
      return;
    }
    await createTeam({
      variables: {
        input: {
          name: team.name,
          description: team.description,
          managerId: team.managerId,
        },
      },
    });
    handleSave();
  };
  return(
    <>
    <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
              <p className="min-w-[100px]">Nombre</p>
              <TextInput
                label="Nombre"
                value={team.name}
                onChange={(value) =>
                  setTeam({
                    ...team,
                    name: value,
                  })
                }
                placeholder="Nombre completo del equipo"
                disabled={false}
              />
              <p className="min-w-[100px]">Lider</p>
              <select
                name="lider"
                className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
                value={team.managerId || ""}
                onChange={(e) =>
                  setTeam({
                    ...team,
                    managerId: e.target.value,
                  })
                }
              >
                <option value="">Seleccione un lider de equipo</option>
                {employeesState.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.userId.name}
                  </option>
                ))}
              </select>
            </div>
            <TextareaInput
              label="Descripción"
              value={team.description}
              onChange={(value) =>
                setTeam({
                  ...team,
                  description: value,
                })
              }
              placeholder="Descripción detallada del equipo"
              disabled={false}
            />
          </div>
          <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
        <p className="text-alert-red text-[12px]">{error}</p>

        <MainButton
          text="Guardar"
          handleClick={handleCreateTeam}
          disabled={loadingTeam}
        />
      </div>
    </>
  )
}