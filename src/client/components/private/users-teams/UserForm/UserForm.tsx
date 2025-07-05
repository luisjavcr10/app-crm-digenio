import { useState, useEffect } from "react";
import { TextInput } from "../../../shared/formElements";
import { useQuery } from "@apollo/client";
import { ID_NAME_TEAMS } from "@/client/services/employees";
import { CREATE_EMPLOYEE } from "@/client/services/employees";
import { TeamLigthProps, UserProps } from "@/app/(modules)/users-teams/types";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useMutation } from "@apollo/client";
import {
  FormLayout,
  FormSection,
} from "@/client/components/shared/formElements";
import { CloseIcon } from "@/client/components/shared/icons/CloseIcon";

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

  const [userData, setUserData] = useState({
    name: userPassed?.userId?.name || "",
    email: userPassed?.userId?.email || "",
    roles: userPassed?.userId?.roles || ([] as string[]),
    rolesAdded: [] as string[],
  });

  const [employeeData, setEmployeeData] = useState({
    position: userPassed?.position || "",
    contactInfo: {
      phone: userPassed?.contactInfo.phone || "",
      emergencyContact: userPassed?.contactInfo.emergencyContact || "",
    },

    skills: userPassed?.skills || ([] as string[]),
    skillsAdded: [] as string[],

    teams: (userPassed?.teams || []).map((team) => ({
      id: team.id || "",
      name: team.name || "",
    })),
    teamsAdded: [] as string[],
  });

  //Requests
  const { data: teams } = useQuery(ID_NAME_TEAMS);
  const [createEmployee, { loading: loadingEmployee }] =
    useMutation(CREATE_EMPLOYEE);

  //Functions
  const handleCreateEmployee = async () => {
    setError("");
    if (userData.name === "") {
      setError("El nombre es requerido");
      return;
    }
    if (userData.email === "") {
      setError("El email es requerido");
      return;
    }
    if (employeeData.position === "") {
      setError("El cargo es requerido");
      return;
    }
    if (employeeData.contactInfo.phone === "") {
      setError("El teléfono es requerido");
      return;
    }
    if (employeeData.contactInfo.emergencyContact === "") {
      setError("El contacto de emergencia es requerido");
      return;
    }
    console.log(employeeData);
    console.log(userData);
    //await createEmployee({
    //  variables: {
    //    userData: {
    //      email: user.userId.email,
    //      name: user.userId.name,
    //      roles: user.roles,
    //    },
    //    employeeData: {
    //      position: user.position,
    //      skills: user.skills,
    //      teams: user.teams,
    //      contactInfo: {
    //        phone: user.contactInfo.phone,
    //        emergencyContact: user.contactInfo.emergencyContact,
    //      },
    //    },
    //  },
    //});
    //handleSave();
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
        <p className="px-3 py-1 text-center rounded-[6px] border border-neutral-3 bg-neutral-4">
          Datos de usuario
        </p>
        <FormSection>
          <p className="w-[100px]">Nombres</p>
          <TextInput
            label="Nombres"
            value={userData.name}
            onChange={(value) => setUserData({ ...userData, name: value })}
            placeholder="Nombre completo del colaborador"
            disabled={mode === "view" ? true : false}
          />
          <p className="w-[100px]">Correo</p>
          <TextInput
            label="correo"
            value={userData.email || ""}
            onChange={(value) => setUserData({ ...userData, email: value })}
            placeholder="Correo electronico del colaborador"
            disabled={mode === "view" ? true : false}
          />
        </FormSection>

        <FormSection>
          <p className="w-[100px]">Roles asignados</p>
          <div className="flex gap-4">
            <select
              className="border border-neutral-3 rounded-[6px] py-1 px-4"
              name="roles"
              id="roles"
              onChange={(e) => {
                const selectedRole = e.target.value;
                setUserData({
                  ...userData,
                  rolesAdded: [...userData.rolesAdded, selectedRole],
                  roles: [...userData.roles, selectedRole],
                })
              }}
            >
              <option value="">Seleccione un rol</option>
              <option value="ADMIN">Administrador</option>
              <option value="TEAMLEADER">Lider de equipo</option>
              <option value="EMPLOYEE">Empleado</option>
            </select>

            {userData.roles.map((role) => (
              <div
                key={role}
                className="border border-neutral-3 rounded-[6px] py-1 px-4 relative"
              >
                <CloseIcon
                  width={5}
                  height={5}
                  className="p-1 absolute -top-2 -right-1 flex items-center justify-center cursor-pointer rounded-full border border-neutral-3 bg-neutral-4 w-[20px] h-[20px] text-center"
                  onClick={() =>
                    setUserData({
                      ...userData,
                      rolesAdded: userData.rolesAdded.filter((r) => r !== role),
                      roles: userData.roles.filter((r) => r !== role),
                    })
                  }
                />
                {role}
              </div>
            ))}
          </div>
        </FormSection>

        {/** Seccion para datos de la entidad empleado */}
        <p className="px-3 py-1 text-center text-[12px] rounded-[6px] border border-neutral-3 bg-neutral-4">
          Datos de empleado
        </p>

        <FormSection>
          <p className="w-[100px]">Posición</p>
          <TextInput
            label="posicion"
            value={employeeData.position}
            onChange={(value) =>
              setEmployeeData({ ...employeeData, position: value })
            }
            placeholder="Posicion"
            disabled={mode === "view" ? true : false}
          />
        </FormSection>
        <FormSection>
          <p className="min-w-[100px]">Equipos</p>
          <div className="flex gap-4">
            <select
              name="teams"
              id="teams"
              className="caret-neutral-3 placeholder-neutral-3 border text-neutral-3 text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[6px] py-1 px-4 flex-1"
              disabled={mode === "view" ? true : false}
              onChange={(e) => {
                const selectedId = e.target.value;
                console.log('selectedId',selectedId)
                if (!selectedId) return;

                // Busca el team completo usando el id
                const selectedTeam = teamsState.find(
                  (team) => team.id === selectedId
                );
                console.log('selectedTeam',selectedTeam)
                if (!selectedTeam) return;

                // Verifica si ya fue agregado
                const alreadyExists = employeeData.teams.some(
                  (team) => team.id === selectedId
                );
                console.log('alreadyExists',alreadyExists)
                if (alreadyExists) return;

                // Agrega el nuevo team y su id sin duplicados
                setEmployeeData({
                  ...employeeData,
                  teams: [
                    ...employeeData.teams,
                    { id: selectedTeam.id, name: selectedTeam.name },
                  ],
                  teamsAdded: [...employeeData.teamsAdded, selectedTeam.id],
                });
              }}
            >
              <option value="">Seleccione un equipo</option>
              {teamsState.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
            {employeeData.teams.map((team) => (
              <div
                key={team?.id}
                className="border border-neutral-3 rounded-[6px] py-1 px-4 relative"
              >
                <CloseIcon 
                  width={5} 
                  height={5}
                  className="p-1 absolute -top-2 -right-1 flex items-center justify-center cursor-pointer rounded-full border border-neutral-3 bg-neutral-4 w-[20px] h-[20px] text-center"
                  onClick={() =>
                    setEmployeeData({
                      ...employeeData,
                      teams: employeeData.teams.filter((t) => t.id !== team.id),
                      teamsAdded: employeeData.teamsAdded.filter((t) => t !== team.id),
                    })
                  }
                />
                {team?.name}
              </div>
            ))}
          </div>
        </FormSection>
        <FormSection>
          <p className="min-w-[100px]">Habilidades</p>
          <div className="flex gap-4">
            <select
            name="skills"
            id="skills"
            className="caret-neutral-3 placeholder-neutral-3 border text-neutral-3 text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[6px] py-1 px-4 flex-1"
            disabled={mode === "view" ? true : false}
            onChange={(e) => {
              const selectSkill = e.target.value;
              setEmployeeData({
                ...employeeData,
                skillsAdded: [...employeeData.skillsAdded, selectSkill],
                skills: [...employeeData.skills, selectSkill],
              });
            }}
          >
            <option value="">Seleccione las habilidades</option>
            <option value="JavaScript">JavaScript</option>
            <option value="Java">Java</option>
            <option value="Spring">Spring</option>
          </select>
          {employeeData.skills.map((skill) => (
              <div
                key={skill}
                className="border border-neutral-3 rounded-[6px] py-1 px-4 relative"
              >
                <CloseIcon 
                  width={5} 
                  height={5}
                  className="p-1 absolute -top-2 -right-1 flex items-center justify-center cursor-pointer rounded-full border border-neutral-3 bg-neutral-4 w-[20px] h-[20px] text-center"
                  onClick={() =>
                    setEmployeeData({
                      ...employeeData,
                      skills: employeeData.skills.filter((s) => s !== skill),
                      skillsAdded: employeeData.skillsAdded.filter((s) => s !== skill),
                    })
                  }
                />
                {skill}
              </div>
            ))}
          </div>
        </FormSection>
        <FormSection>
          <p className="w-[100px]">Telefono</p>
          <TextInput
            label="area"
            value={employeeData.contactInfo.phone}
            onChange={(value) =>
              setEmployeeData({
                ...employeeData,
                contactInfo: { ...employeeData.contactInfo, phone: value },
              })
            }
            placeholder="Area"
            disabled={mode === "view" ? true : false}
          />
          <p className="w-[100px]">Contacto de emergencia</p>
          <TextInput
            label="area"
            value={employeeData.contactInfo.emergencyContact}
            onChange={(value) =>
              setEmployeeData({
                ...employeeData,
                contactInfo: { ...employeeData.contactInfo, emergencyContact: value },
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
              <div className="py-2 px-4 border border-neutral-3 rounded-[12px]">
                DevOps
              </div>
              <div className="py-2 px-4 border border-neutral-3 rounded-[12px]">
                DevOps
              </div>
              <div className="py-2 px-4 border border-neutral-3 rounded-[12px]">
                DevOps
              </div>
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
