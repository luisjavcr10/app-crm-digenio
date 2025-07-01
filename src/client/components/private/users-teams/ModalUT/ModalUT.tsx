import { useState } from "react";
import { OkrTextInput } from "../../okrs/OkrTextInput";
import { OkrTextareaInput } from "../../okrs/OkrTextareaInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useMutation } from "@apollo/client";
import { CREATE_EMPLOYEE, CREATE_TEAM } from "@/client/services/employees";

interface TeamProps {
  id: string;
  name: string;
  description: string;
  status: string;
  manager: {
    userId: {
      name: string;
    };
  };
  members: {
    userId: {
      name: string;
    };
  }[];
}

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
    id:string;
    name:string
  }[];
  contactInfo:{
    phone:string;
    emergencyContact:string;
  }
}

export const ModalUT = ({
  teams,
  users,
  handleClose,
}: Readonly<{
  teams: TeamProps[];
  users: UserProps[];
  handleClose: () => void;
}>) => {
  const [error, setError] = useState<string>("");
  const [entity, setEntity] = useState<"users" | "teams">("users");
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

  const [team, setTeam] = useState(
    {
      name:"",
      description:"",
      managerId:"",
    }
  )

  const [createEmployee, {loading:loadingEmployee}] = useMutation(CREATE_EMPLOYEE);
  const [createTeam, {loading:loadingTeam}] = useMutation(CREATE_TEAM);

  const handleCreateEmployee = async () => {
    setError("");
    if(user.userId.name === ""){
      setError("El nombre es requerido");
      return;
    }
    if(user.userId.email === ""){
      setError("El email es requerido");
      return;
    }
    if(user.position === ""){
      setError("El cargo es requerido");
      return;
    }
    if(user.department === ""){
      setError("El departamento es requerido");
      return;
    }
    if(user.contactInfo.phone === ""){
      setError("El teléfono es requerido");
      return;
    }
    if(user.contactInfo.emergencyContact === ""){
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
    handleClose();
  };

  const handleCreateTeam = async () => {
    setError("");
    if(team.name === ""){
      setError("El nombre es requerido");
      return;
    }
    if(team.description === ""){
      setError("La descripción es requerida");
      return;
    }
    if(team.managerId === ""){
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
    handleClose();
  };

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
                <OkrTextInput
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
                <OkrTextInput
                  label="area"
                  value={user.department}
                  onChange={(value) => setUser({ ...user, department: value })}
                  placeholder="Area"
                  disabled={false}
                />
                <p className="min-w-[100px]">Posición</p>
                <OkrTextInput
                  label="posicion"
                  value={user.position}
                  onChange={(value) => setUser({ ...user, position: value })}
                  placeholder="Posicion"
                  disabled={false}
                />
              </div>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Telefono</p>
                <OkrTextInput
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
                  onChange={(e) =>
                    setUser({ ...user, teams: [e.target.value]  })
                  }
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
            <>
              <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                  <p className="min-w-[100px]">Nombre</p>
                  <OkrTextInput
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
                    {users.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.userId.name}
                      </option>
                    ))}
                  </select>
              </div>
              <OkrTextareaInput
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

            </>
          )}
        </div>

        <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
          <p className="text-alert-red text-[12px]">{error}</p>
          
          <MainButton 
            text="Guardar" 
            handleClick={entity==="users"?handleCreateEmployee:handleCreateTeam} 
            disabled={loadingEmployee || loadingTeam}
          />

        </div>
      </div>
    </div>
  );
};
