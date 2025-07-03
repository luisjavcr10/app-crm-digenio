import { useState, useEffect } from "react";
import { TextInput } from "../../../shared/formElements";
import { useQuery } from "@apollo/client";
import { ID_NAME_TEAMS } from "@/client/services/employees";
import { CREATE_EMPLOYEE } from "@/client/services/employees";
import { TeamLigthProps } from "@/app/(modules)/users-teams/types";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useMutation } from "@apollo/client";

export const UserForm = ({ handleSave }: { handleSave: () => void }) => {
  const { data: teams } = useQuery(ID_NAME_TEAMS);
  const [createEmployee, { loading: loadingEmployee }] =
    useMutation(CREATE_EMPLOYEE);

  const [user, setUser] = useState({
    position: "",
    department: "",
    skills: ["TypeScript"],
    userId: {
      name: "",
      email: "",
    },
    teams: [] as string[],
    contactInfo: {
      phone: "",
      emergencyContact: "943721646",
    },
  });
  const [error, setError] = useState<string>("");

  const handleCreateEmployee = async () => {
    setError("");
    if (user.userId.name === "") {
      setError("El nombre es requerido");
      return;
    }
    if (user.userId.email === "") {
      setError("El email es requerido");
      return;
    }
    if (user.position === "") {
      setError("El cargo es requerido");
      return;
    }
    if (user.department === "") {
      setError("El departamento es requerido");
      return;
    }
    if (user.contactInfo.phone === "") {
      setError("El teléfono es requerido");
      return;
    }
    if (user.contactInfo.emergencyContact === "") {
      setError("El contacto de emergencia es requerido");
      return;
    }
    await createEmployee({
      variables: {
        userData: {
          email: user.userId.email,
          name: user.userId.name,
          role: "USER",
        },
        employeeData: {
          position: user.position,
          department: user.department,
          skills: user.skills,
          teams: user.teams,
          contactInfo: {
            phone: user.contactInfo.phone,
            emergencyContact: user.contactInfo.emergencyContact,
          },
        },
      },
    });
    handleSave();
  };

  useEffect(() => {
    if (teams) {
      setTeams(teams.teams);
    }
  }, [teams]);
  const [teamsState, setTeams] = useState<TeamLigthProps[]>([]);

  return (
    <>
      <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <p className="min-w-[100px]">Nombres</p>
          <TextInput
            label="Nombres"
            value={user.userId.name}
            onChange={(value) =>
              setUser({
                ...user,
                userId: { ...user.userId, name: value },
              })
            }
            placeholder="Nombre completo del colaborador"
            disabled={false}
          />
          <p className="min-w-[100px]">Correo</p>
          <TextInput
            label="correo"
            value={user.userId.email}
            onChange={(value) =>
              setUser({
                ...user,
                userId: { ...user.userId, email: value },
              })
            }
            placeholder="Correo electronico del colaborador"
            disabled={false}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <p className="min-w-[100px]">Area</p>
          <TextInput
            label="area"
            value={user.department}
            onChange={(value) => setUser({ ...user, department: value })}
            placeholder="Area"
            disabled={false}
          />
          <p className="min-w-[100px]">Posición</p>
          <TextInput
            label="posicion"
            value={user.position}
            onChange={(value) => setUser({ ...user, position: value })}
            placeholder="Posicion"
            disabled={false}
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
          <p className="min-w-[100px]">Telefono</p>
          <TextInput
            label="area"
            value={user.contactInfo.phone}
            onChange={(value) =>
              setUser({
                ...user,
                contactInfo: { ...user.contactInfo, phone: value },
              })
            }
            placeholder="Area"
            disabled={false}
          />
          <p className="min-w-[100px]">Equipo</p>
          <select
            name="equipo"
            className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
            value={user.teams[0] || ""}
            onChange={(e) => setUser({ ...user, teams: [e.target.value] })}
          >
            <option value="">Seleccione un equipo</option>
            {teamsState.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
        <p className="text-alert-red text-[12px]">{error}</p>

        <MainButton
          text="Guardar"
          handleClick={handleCreateEmployee}
          disabled={loadingEmployee}
        />
      </div>
    </>
  );
};
