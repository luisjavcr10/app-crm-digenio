import { useState, useEffect } from "react";
import { TextInput, TextareaInput } from "../../../shared/formElements";
import { useQuery, useMutation } from "@apollo/client";
import { ID_NAME_EMPLOYEES, CREATE_TEAM } from "@/client/services/employees";
import { EmployeeLigthProps } from "@/app/(modules)/users-teams/types";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { FormLayout } from "@/client/components/shared/formElements";

export const TeamForm = ({
  mode,
  handleSave,
}: Readonly<{
  mode: "create" | "edit" | "view";
  handleSave: () => void;
}>) => {
  //States
  const [employeesState, setEmployees] = useState<EmployeeLigthProps[]>([]);
  const [error, setError] = useState<string>("");
  const [team, setTeam] = useState({
    name: "",
    description: "",
    managerId: "",
  });

  //Requests
  const { data: employees } = useQuery(ID_NAME_EMPLOYEES);
  const [createTeam, { loading: loadingTeam }] = useMutation(CREATE_TEAM);

  //Functions
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

  //Effects
  useEffect(() => {
    if (employees) {
      setEmployees(employees.employees);
    }
  }, [employees]);

  return (
    <>
      <FormLayout>
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
            disabled={mode==='view'? true : false}
          />
          <p className="min-w-[100px]">Lider</p>
          <select
            name="lider"
            className="caret-neutral-3 placeholder-neutral-3 border text-neutral-3 text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
            value={team.managerId || ""}
            disabled={mode==='view'? true : false}
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
          disabled={mode==='view'? true : false}
        />
      </FormLayout>
      { mode !== "view" && <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
        <p className="text-alert-red text-[12px]">{error}</p>

        <MainButton
          text="Guardar"
          handleClick={handleCreateTeam}
          disabled={loadingTeam}
        />
      </div>}
    </>
  );
};
