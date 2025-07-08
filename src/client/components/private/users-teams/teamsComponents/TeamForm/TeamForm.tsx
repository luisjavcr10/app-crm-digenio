import { useState, useEffect, useRef } from "react";
import { TextInput, TextareaInput } from "../../../../shared/formElements";
import { useQuery, useMutation } from "@apollo/client";
import { ID_NAME_EMPLOYEES, CREATE_TEAM } from "@/client/services/employees";
import { EmployeeLigthProps } from "@/app/(modules)/users-teams/types";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { FormLayout } from "@/client/components/shared/formElements";
import { FormSection } from "../../../../shared/formElements";
import { TeamProps } from "@/app/(modules)/users-teams/types";

export const TeamForm = ({
  mode,
  handleSave,
  teamPassed,
}: Readonly<{
  mode: "create" | "edit" | "view";
  handleSave: () => void;
  teamPassed?: TeamProps;
}>) => {
  //States
  const [employeesState, setEmployees] = useState<EmployeeLigthProps[]>([]);
  const [error, setError] = useState<string>("");
  const [team, setTeam] = useState({
    id: teamPassed?.id || "",
    name: teamPassed?.name || "",
    description: teamPassed?.description || "",
    managerId: teamPassed?.manager.id || "",
    manager: teamPassed?.manager.userId.name || "",
    membersIds: teamPassed?.members?.map((m) => m.id) || [],
    members: teamPassed?.members || []
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectedManager, setSelectedManager] = useState("");
  const [memberSearchTerm, setMemberSearchTerm] = useState("");
  const [showMemberDropdown, setShowMemberDropdown] = useState(false);
  //Referencias a los dropdown para cerrarlos con click en cualquier lugar de la pantalla
  const dropdownRef = useRef<HTMLDivElement>(null);
  const memberDropdownRef = useRef<HTMLDivElement>(null);

  //Requests
  const { data: employees } = useQuery(ID_NAME_EMPLOYEES);
  const [createTeam, { loading: loadingTeam }] = useMutation(CREATE_TEAM);
  
  const logs = () =>{
    console.log(team);
  }

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
          membersIds: team.membersIds,
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

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowDropdown(false);
      }
      if (memberDropdownRef.current && !memberDropdownRef.current.contains(event.target as Node)) {
        setShowMemberDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <FormLayout>
        {/** Seccion para datos principales del equipo*/}
        <p className="px-3 py-1 text-center rounded-[6px] border border-neutral-3 bg-neutral-4">
          Datos del equipo
        </p>
        <FormSection>
          <p className="w-[100px]">Nombre</p>
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
            disabled={mode === "view" ? true : false}
          />
        </FormSection>
        <FormSection>
          <p className="w-[100px]">Descripción</p>
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
            disabled={mode === "view" ? true : false}
          />
        </FormSection>

        {/** Seccion para datos de integrantes del equipo*/}
        <p className="px-3 py-1 text-center rounded-[6px] border border-neutral-3 bg-neutral-4">
          Lider e integrantes del equipo
        </p>
        <FormSection>
          <p className="w-[100px]">Lider</p>
          <div className="relative flex-1" ref={dropdownRef}>
            <input
              type="text"
              value={mode!== 'create'? team.manager : selectedManager || searchTerm }
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setShowDropdown(true);
                if (!e.target.value) {
                  setSelectedManager("");
                  setTeam({ ...team, managerId: "" });
                }
              }}
              onFocus={() => setShowDropdown(true)}
              placeholder="Buscar empleado..."
              className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[6px] py-1 px-4 flex-1 w-full"
              disabled={mode !== "create"}
            />
            {showDropdown && searchTerm && !selectedManager && (
              <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[6px] mt-1 max-h-40 overflow-y-auto z-10 shadow-lg">
                {employeesState
                  .filter((employee) =>
                    employee.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
                  )
                  .map((employee) => (
                    <div
                      key={employee.id}
                      className="px-4 py-2 hover:bg-neutral-4 dark:hover:bg-neutral-2 cursor-pointer text-[12px]"
                      onClick={() => {
                        setSelectedManager(employee.userId.name);
                        setTeam({ ...team, managerId: employee.id });
                        setSearchTerm("");
                        setShowDropdown(false);
                      }}
                    >
                      {employee.userId.name}
                    </div>
                  ))}
                {employeesState.filter((employee) =>
                  employee.userId.name.toLowerCase().includes(searchTerm.toLowerCase())
                ).length === 0 && (
                  <div className="px-4 py-2 text-neutral-3 text-[12px]">
                    No se encontraron empleados
                  </div>
                )}
              </div>
            )}
          </div>
        </FormSection>
        {mode === 'create' && <FormSection>
          <p className="w-[100px]">Integrantes</p>
          <div className="flex-1">
            <div className="relative" ref={memberDropdownRef}>
              <input
                type="text"
                value={memberSearchTerm}
                onChange={(e) => {
                  setMemberSearchTerm(e.target.value);
                  setShowMemberDropdown(true);
                }}
                onFocus={() => setShowMemberDropdown(true)}
                placeholder="Buscar empleado para agregar..."
                className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[6px] py-1 px-4 w-full"
              />
              {showMemberDropdown && memberSearchTerm && (
                <div className="absolute top-full left-0 right-0 bg-white dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[6px] mt-1 max-h-40 overflow-y-auto z-10 shadow-lg">
                  {employeesState
                    .filter((employee) =>
                      employee.userId.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) &&
                      !team.membersIds.includes(employee.id) &&
                      employee.id !== team.managerId
                    )
                    .map((employee) => (
                      <div
                        key={employee.id}
                        className="px-4 py-2 hover:bg-neutral-4 dark:hover:bg-neutral-2 cursor-pointer text-[12px]"
                        onClick={() => {
                          setTeam({ ...team, 
                            membersIds: [...team.membersIds, employee.id] ,
                            members: [...team.members, {
                              id:employee.id,
                              userId: {
                                name: employee.userId.name
                              }
                            }]
                          });
                          setMemberSearchTerm("");
                          setShowMemberDropdown(false);
                        }}
                      >
                        {employee.userId.name}
                      </div>
                    ))}
                  {employeesState.filter((employee) =>
                    employee.userId.name.toLowerCase().includes(memberSearchTerm.toLowerCase()) &&
                    !team.membersIds.includes(employee.id) &&
                    employee.id !== team.managerId
                  ).length === 0 && (
                    <div className="px-4 py-2 text-neutral-3 text-[12px]">
                      No se encontraron empleados disponibles
                    </div>
                  )}
                </div>
              )}
            </div>
            
            
          </div>
        </FormSection>}

        <FormSection>
          {/* Lista de integrantes seleccionados */}
            {team.members.length > 0 && (
              <div className="mt-3 space-y-2">
                <p className="text-[12px] mb-4">Integrantes seleccionados:</p>
                <div className="flex flex-wrap gap-2">
                  {team.members.map((member) => 
                    //const employee = employeesState.find(emp => emp.id === member.userId.name);
                    
                      <div
                        key={member.userId.name}
                        className="flex items-center gap-2 bg-neutral-4 dark:bg-neutral-2 border border-neutral-3 dark:border-neutral-2 rounded-[6px] px-3 py-1"
                      >
                        <span className="text-[12px]">{member.userId.name}</span>
                        {mode === "create" && (
                          <button
                            type="button"
                            onClick={() => {
                              setTeam({
                                ...team,
                                membersIds: team.membersIds.filter(id => id !== member.id),
                                members: team.members.filter(m => m.id !== member.id)
                              });
                            }}
                            className="text-alert-red hover:text-red-700 text-[14px] font-bold"
                          >
                            ×
                          </button>
                        )}
                      </div>
                  )}
                </div>
              </div>
            )}
        </FormSection>


      </FormLayout>

      {mode !== "view" && (
        <div className="w-full py-4 px-6 flex flex-col justify-center items-center gap-4">
          <p className="text-alert-red text-[12px]">{error}</p>

          <MainButton
            text="Guardar"
            handleClick={logs}
            disabled={loadingTeam}
          />
        </div>
      )}
    </>
  );
};
