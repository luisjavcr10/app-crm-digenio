import { useState, useEffect } from "react";
import { TextInput } from "../../../shared/formElements";
import { useQuery } from "@apollo/client";
import { ID_NAME_TEAMS } from "@/client/services/employees";
import { CREATE_EMPLOYEE } from "@/client/services/employees";
import { TeamLigthProps, UserProps } from "@/app/(modules)/users-teams/types";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useMutation } from "@apollo/client";
import { FormLayout, FormSection } from "@/client/components/shared/formElements";

export const UserForm = ({
  mode,
  handleSave,
  userPassed,
}: {
  mode: "create" | "edit" | "view";
  handleSave: () => void;
  userPassed?: UserProps;
}) => {
  //States
  const [error, setError] = useState<string>("");
  const [user, setUser] = useState({
    userId: userPassed?.userId || {
      name: "",
      email: "",
    },
    position: userPassed?.position || "",
    department: userPassed?.department || "",
    skills: userPassed?.skills || ([] as string[]),

    teams: [] as string[],
    contactInfo: userPassed?.contactInfo || {
      phone: "",
      emergencyContact: "",
    },
  });

  //Requests
  const { data: teams } = useQuery(ID_NAME_TEAMS);
  const [createEmployee, { loading: loadingEmployee }] =
    useMutation(CREATE_EMPLOYEE);

  //Functions
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

  //Effects
  useEffect(() => {
    if (teams) {
      setTeams(teams.teams);
    }
  }, [teams]);
  const [teamsState, setTeams] = useState<TeamLigthProps[]>([]);

  return (
    <>
      <FormLayout>

        {/** Seccion para datos de la entidad usuario */}
        <p className="px-3 py-1 text-center rounded-[6px] border border-neutral-3 bg-neutral-4">Datos de usuario</p>
        <FormSection>
          <p className="w-[100px]">Nombres</p>
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
            disabled={mode === "view" ? true : false}
          />
        </FormSection>
        <FormSection>
          <p className="w-[100px]">Correo</p>
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
            disabled={mode === "view" ? true : false}
          />
          <p className="w-[100px]">Roles asignados</p>
          <TextInput
            label="Correo electronico"
            value={user.userId.name}
            onChange={(value) =>
              setUser({
                ...user,
                userId: { ...user.userId, name: value },
              })
            }
            placeholder="Nombre completo del colaborador"
            disabled={mode === "view" ? true : false}
          />
          
        </FormSection>

        {/** Seccion para datos de la entidad empleado */}
        <p className="px-3 py-1 text-center text-[12px] rounded-[6px] border border-neutral-3 bg-neutral-4">Datos de empleado</p>

        <FormSection>
          <p className="w-[100px]">Area</p>
          <TextInput
            label="area"
            value={user.department}
            onChange={(value) => setUser({ ...user, department: value })}
            placeholder="Area"
            disabled={mode === "view" ? true : false}
          />
          <p className="w-[100px]">Posición</p>
          <TextInput
            label="posicion"
            value={user.position}
            onChange={(value) => setUser({ ...user, position: value })}
            placeholder="Posicion"
            disabled={mode === "view" ? true : false}
          />
        </FormSection>
        <FormSection>
          <p className="min-w-[100px]">Equipos</p>
          <select
            name="equipo"
            className="caret-neutral-3 placeholder-neutral-3 border text-neutral-3 text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
            value={""}
            disabled={mode === "view" ? true : false}
            onChange={(e) => setUser({ ...user, teams: [e.target.value] })}
          >
            <option value="">Seleccione un equipo</option>
            {teamsState.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </FormSection>
        <FormSection>
          <p className="min-w-[100px]">Habilidades</p>
          <select
            name="equipo"
            className="caret-neutral-3 placeholder-neutral-3 border text-neutral-3 text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
            value={""}
            disabled={mode === "view" ? true : false}
            onChange={(e) => setUser({ ...user, teams: [e.target.value] })}
          >
            <option value="">Seleccione un equipo</option>
            {teamsState.map((team) => (
              <option key={team.id} value={team.id}>
                {team.name}
              </option>
            ))}
          </select>
        </FormSection>
        <FormSection>
          <p className="w-[100px]">Telefono</p>
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
            disabled={mode === "view" ? true : false}
          />
          <p className="w-[100px]">Contacto de emergencia</p>
          <TextInput
            label="area"
            value={user.contactInfo.emergencyContact}
            onChange={(value) =>
              setUser({
                ...user,
                contactInfo: { ...user.contactInfo, emergencyContact: value },
              })
            }
            placeholder="Area"
            disabled={mode === "view" ? true : false}
          />
        </FormSection>
        
        {mode !== "create" && (
          <div className="flex gap-8">
            <p className="min-w-[100px]">Telefono</p>
            <div className="flex gap-4">
              <div className="py-2 px-4 border border-neutral-3 rounded-[12px]">DevOps</div>
              <div className="py-2 px-4 border border-neutral-3 rounded-[12px]">DevOps</div>
              <div className="py-2 px-4 border border-neutral-3 rounded-[12px]">DevOps</div>
            </div>
          </div>
        )}
      </FormLayout>

      {mode !== "view" && (
        <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
          <p className="text-alert-red text-[12px]">{error}</p>

          <MainButton
            text="Guardar"
            handleClick={handleCreateEmployee}
            disabled={loadingEmployee}
          />
        </div>
      )}
    </>
  );
};
