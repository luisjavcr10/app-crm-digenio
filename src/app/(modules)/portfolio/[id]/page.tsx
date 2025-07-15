"use client";
import { useParams, useRouter } from "next/navigation";
import { useQuery, useMutation } from "@apollo/client";
import { GET_STARTUP_QUERY, UPDATE_STARTUP_MUTATION } from "@/client/services/startups";
import { ID_NAME_EMPLOYEES } from "@/client/services/employees";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { ChevronLeft, PlusIcon, EditIcon, CheckIcon} from "@/client/components/shared/icons";
import { useAuth } from "@/client/hooks/useAuth";
import { useState, useEffect, useRef } from "react";
import { getFormattedDate } from "@/client/utils/formatDate";

interface IStartup {
  _id: string;
  name: string;
  description: string;
  okrId: {
    id: string;
    name: string;
  };
  teamId: {
    id: string;
    name: string;
  };
  status: string;
  observation?: string;
  sprints: {
    orderNumber: number;
    name: string;
    deliverable?: string;
    startDate?: string;
    endDate?: string;
    status: string;
    modules: {
      name: string;
      task: string;
      responsible: {
        id: string;
        userId: {
          email: string;
          name: string;
        };
      };
      status: string;
      deadline?: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Página de detalle de startup que muestra información completa
 * incluyendo sprints y entregables
 */
export default function StartupDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useAuth();
  const startupId = params.id as string;
  
  // Estados para manejo de UI
  const [isAddingSprint, setIsAddingSprint] = useState(false);
  const [editingSprintIndex, setEditingSprintIndex] = useState<number | null>(null);
  const [viewingModulesIndex, setViewingModulesIndex] = useState<number | null>(null);
  const [editingModuleIndex, setEditingModuleIndex] = useState<number | null>(null);
  const [isAddingModule, setIsAddingModule] = useState(false);
  
  // Estados para formularios
  const [newSprint, setNewSprint] = useState<{
    orderNumber: number;
    name: string;
    deliverable: string;
    startDate: string;
    endDate: string;
    status: "planned" | "in_progress" | "completed" | "delayed";
  }>({
    orderNumber: 0,
    name: '',
    deliverable: '',
    startDate: '',
    endDate: '',
    status: 'planned'
  });
  
  console.log(newSprint);

  const [editingSprint, setEditingSprint] = useState<{
    orderNumber: number;
    name: string;
    deliverable: string;
    startDate: string;
    endDate: string;
    status: "planned" | "in_progress" | "completed" | "delayed";
  }>({
    orderNumber: 0,
    name: '',
    deliverable: '',
    startDate: '',
    endDate: '',
    status: 'planned'
  });
  
  const [newModule, setNewModule] = useState<{
    name: string;
    task: string;
    responsible: string;
    responsibleName: string;
    status: "pending" | "in_progress" | "completed" | "blocked";
    deadline: string;
  }>({
    name: '',
    task: '',
    responsible: '',
    responsibleName: '',
    status: 'pending',
    deadline: ''
  });
  
  const [editingModule, setEditingModule] = useState<{
    name: string;
    task: string;
    responsible: string;
    responsibleName: string;
    status: "pending" | "in_progress" | "completed" | "blocked";
    deadline: string;
  }>({
    name: '',
    task: '',
    responsible: '',
    responsibleName: '',
    status: 'pending',
    deadline: ''
  });

  // Estados para búsqueda de empleados
  const [showEmployeeDropdown, setShowEmployeeDropdown] = useState(false);
  const [showEditEmployeeDropdown, setShowEditEmployeeDropdown] = useState(false);
  const [employeeSearchTerm, setEmployeeSearchTerm] = useState('');
  const [editEmployeeSearchTerm, setEditEmployeeSearchTerm] = useState('');

  // Referencias para detectar clics fuera de los dropdowns
  const employeeDropdownRef = useRef<HTMLDivElement>(null);
  const editEmployeeDropdownRef = useRef<HTMLDivElement>(null);

  // Efecto para cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (employeeDropdownRef.current && !employeeDropdownRef.current.contains(event.target as Node)) {
        setShowEmployeeDropdown(false);
      }
      if (editEmployeeDropdownRef.current && !editEmployeeDropdownRef.current.contains(event.target as Node)) {
        setShowEditEmployeeDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const { data, loading, error, refetch } = useQuery<{ getStartup: IStartup }>(
    GET_STARTUP_QUERY,
    {
      variables: { id: startupId },
      skip: !startupId,
    }
  );

  const { data: employeesData } = useQuery<{
    employees: {
      id: string;
      userId: {
        name: string;
      };
    }[];
  }>(ID_NAME_EMPLOYEES);

  const [updateStartup] = useMutation(UPDATE_STARTUP_MUTATION);

  const startup = data?.getStartup;
  const employees = employeesData?.employees || [];
  console.log(startup)

  // Funciones para manejo de sprints
  const handleAddSprint = () => {
    if (!user?.roles.includes('TEAMLEADER')) return;
    const nextOrderNumber = (startup?.sprints?.length || 0) + 1;
    setNewSprint({
      orderNumber: nextOrderNumber,
      name: '',
      deliverable: '',
      startDate: '',
      endDate: '',
      status: 'planned' as "planned" | "in_progress" | "completed" | "delayed"
    });
    setIsAddingSprint(true);
  };

  const handleConfirmAddSprint = async () => {
    if (!startup) return;
    
    try {
      const updatedSprints = [
        ...(startup.sprints || []),
        {
          orderNumber: newSprint.orderNumber,
          name: newSprint.name,
          deliverable: newSprint.deliverable,
          startDate: newSprint.startDate || null,
          endDate: newSprint.endDate || null,
          status: mapSprintStatusToGraphQL(newSprint.status),
          modules: []
        }
      ];

      await updateStartup({
        variables: {
          id: startupId,
          input: {
            name: startup.name,
            description: startup.description,
            okrId: startup.okrId.id,
            teamId: startup.teamId.id,
            sprints: updatedSprints
          }
        }
      });

      await refetch();
      setIsAddingSprint(false);
      setNewSprint({
        orderNumber: 0,
        name: '',
        deliverable: '',
        startDate: '',
        endDate: '',
        status: 'planned' as "planned" | "in_progress" | "completed" | "delayed"
      });
    } catch (error) {
      console.error('Error agregando sprint:', error);
    }
  };

  const handleCancelAddSprint = () => {
    setIsAddingSprint(false);
    setNewSprint({
      orderNumber: 0,
      name: '',
      deliverable: '',
      startDate: '',
      endDate: '',
      status: 'planned' as "planned" | "in_progress" | "completed" | "delayed"
    });
  };

  const handleEditSprint = (index: number) => {
    if (!user?.roles.includes('TEAMLEADER')) return;
    const sprint = startup?.sprints[index];
    if (sprint) {
      setEditingSprint({
        orderNumber: sprint.orderNumber,
        name: sprint.name,
        deliverable: sprint.deliverable || '',
        startDate: sprint.startDate || '',
        endDate: sprint.endDate || '',
        status: sprint.status as "planned" | "in_progress" | "completed" | "delayed"
      });
      setEditingSprintIndex(index);
    }
  };

  // Funciones de mapeo para convertir estados a GraphQL enums
  const mapSprintStatusToGraphQL = (status: string): string => {
    const statusMap: Record<string, string> = {
      'planned': 'PLANNED',
      'in_progress': 'IN_PROGRESS', 
      'completed': 'COMPLETED',
      'delayed': 'DELAYED'
    };
    return statusMap[status] || status;
  };

  const mapModuleStatusToGraphQL = (status: string): string => {
    const statusMap: Record<string, string> = {
      'pending': 'PENDING',
      'in_progress': 'IN_PROGRESS',
      'completed': 'COMPLETED', 
      'blocked': 'BLOCKED'
    };
    return statusMap[status] || status;
  };

  const handleConfirmEditSprint = async () => {
    if (!startup || editingSprintIndex === null) return;
    
    try {
      const updatedSprints = startup.sprints.map((sprint, index) => {
        if (index === editingSprintIndex) {
          return {
            orderNumber: editingSprint.orderNumber,
            name: editingSprint.name,
            deliverable: editingSprint.deliverable,
            startDate: editingSprint.startDate || null,
            endDate: editingSprint.endDate || null,
            status: mapSprintStatusToGraphQL(editingSprint.status),
            modules: sprint.modules || []
          };
        }
        return {
          orderNumber: sprint.orderNumber,
          name: sprint.name,
          deliverable: sprint.deliverable,
          startDate: sprint.startDate,
          endDate: sprint.endDate,
          status: mapSprintStatusToGraphQL(sprint.status),
          modules: (sprint.modules || []).map(module => ({
            name: module.name,
            task: module.task,
            responsible: module.responsible.id, // Solo enviar el ID
            status: mapModuleStatusToGraphQL(module.status),
            deadline: module.deadline
          }))
        };
      });

      await updateStartup({
        variables: {
          id: startupId,
          input: {
            name: startup.name,
            description: startup.description,
            okrId: startup.okrId.id,
            teamId: startup.teamId.id,
            sprints: updatedSprints
          }
        }
      });

      await refetch();
      setEditingSprintIndex(null);
    } catch (error) {
      console.error('Error editando sprint:', error);
    }
  };

  const handleCancelEditSprint = () => {
    setEditingSprintIndex(null);
  };

  // Funciones para manejo de módulos
  const handleViewModules = (sprintIndex: number) => {
    setViewingModulesIndex(sprintIndex);
  };

  const handleBackToSprints = () => {
    setViewingModulesIndex(null);
    setIsAddingModule(false);
    setEditingModuleIndex(null);
  };

  const handleAddModule = () => {
    if (!user?.roles.includes('TEAMLEADER')) return;
    setNewModule({
      name: '',
      task: '',
      responsible: '',
      responsibleName: '',
      status: 'pending',
      deadline: ''
    });
    setEmployeeSearchTerm('');
    setShowEmployeeDropdown(false);
    setIsAddingModule(true);
  };

  const handleConfirmAddModule = async () => {
    if (!startup || viewingModulesIndex === null) return;
    
    try {
      const updatedSprints = startup.sprints.map((sprint, index) => {
        if (index === viewingModulesIndex) {
          const newModuleData = {
            name: newModule.name,
            task: newModule.task,
            responsible: newModule.responsible, // Solo enviar el ID
            status: mapModuleStatusToGraphQL(newModule.status),
            deadline: newModule.deadline || null
          };
          
          return {
            orderNumber: sprint.orderNumber,
            name: sprint.name,
            deliverable: sprint.deliverable,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            status: mapSprintStatusToGraphQL(sprint.status),
            modules: [...(sprint.modules || []), newModuleData]
          };
        }
        return {
          orderNumber: sprint.orderNumber,
          name: sprint.name,
          deliverable: sprint.deliverable,
          startDate: sprint.startDate,
          endDate: sprint.endDate,
          status: mapSprintStatusToGraphQL(sprint.status),
          modules: (sprint.modules || []).map(module => ({
            name: module.name,
            task: module.task,
            responsible: module.responsible.id, // Solo enviar el ID
            status: mapModuleStatusToGraphQL(module.status),
            deadline: module.deadline
          }))
        };
      });

      await updateStartup({
        variables: {
          id: startupId,
          input: {
            name: startup.name,
            description: startup.description,
            okrId: startup.okrId.id,
            teamId: startup.teamId.id,
            sprints: updatedSprints
          }
        }
      });

      await refetch();
      setIsAddingModule(false);
      setNewModule({
         name: '',
         task: '',
         responsible: '',
         responsibleName: '',
         status: 'pending',
         deadline: ''
       });
       setEmployeeSearchTerm('');
       setShowEmployeeDropdown(false);
    } catch (error) {
      console.error('Error agregando módulo:', error);
    }
  };

  const handleCancelAddModule = () => {
    setIsAddingModule(false);
  };

  const handleEditModule = (moduleIndex: number) => {
    if (!user?.roles.includes('TEAMLEADER')) return;
    console.log(moduleIndex);
    //const sprint = startup?.sprints[viewingModulesIndex!];
    //const module = sprint?.modules[moduleIndex];
    //if (module) {
    //  setEditingModule({
    //    name: module.name,
    //    task: module.task,
    //    responsible: module.responsible.id,
    //    responsibleName: module.responsible.userId.name,
    //    status: module.status,
    //    deadline: module.deadline ? new Date(module.deadline).toISOString().split('T')[0] : ''
    //  });
    //  setEditEmployeeSearchTerm(module.responsible.userId.name);
    //  setShowEditEmployeeDropdown(false);
    //  setEditingModuleIndex(moduleIndex);
    //}
  };

  const handleConfirmEditModule = async () => {
    if (!startup || viewingModulesIndex === null || editingModuleIndex === null) return;
    
    try {
      const updatedSprints = startup.sprints.map((sprint, sprintIndex) => {
        if (sprintIndex === viewingModulesIndex) {
          const updatedModules = sprint.modules.map((module, moduleIndex) => {
            if (moduleIndex === editingModuleIndex) {
              return {
                name: editingModule.name,
                task: editingModule.task,
                responsible: editingModule.responsible, // Solo enviar el ID
                status: mapModuleStatusToGraphQL(editingModule.status),
                deadline: editingModule.deadline || null
              };
            }
            // Para módulos no editados, también enviar solo el ID del responsable
            return {
              name: module.name,
              task: module.task,
              responsible: module.responsible.id, // Solo enviar el ID
              status: mapModuleStatusToGraphQL(module.status),
              deadline: module.deadline
            };
          });
          
          return {
            orderNumber: sprint.orderNumber,
            name: sprint.name,
            deliverable: sprint.deliverable,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            status: mapSprintStatusToGraphQL(sprint.status),
            modules: updatedModules
          };
        }
        return {
          orderNumber: sprint.orderNumber,
          name: sprint.name,
          deliverable: sprint.deliverable,
          startDate: sprint.startDate,
          endDate: sprint.endDate,
          status: mapSprintStatusToGraphQL(sprint.status),
          modules: (sprint.modules || []).map(module => ({
            name: module.name,
            task: module.task,
            responsible: module.responsible.id,
            status: mapModuleStatusToGraphQL(module.status),
            deadline: module.deadline
          }))
        };
      });

      await updateStartup({
        variables: {
          id: startupId,
          input: {
            name: startup.name,
            description: startup.description,
            okrId: startup.okrId.id,
            teamId: startup.teamId.id,
            sprints: updatedSprints
          }
        }
      });

      await refetch();
      setEditingModuleIndex(null);
    } catch (error) {
      console.error('Error editando módulo:', error);
    }
  };

  const handleCancelEditModule = () => {
    setEditingModuleIndex(null);
  };

  if (loading) {
    return (
      <div className="h-full my-6 mx-8 flex justify-center items-center">
        <div className="text-lg">Cargando...</div>
      </div>
    );
  }

  if (error || !startup) {
    return (
      <div className="h-full my-6 mx-8 flex flex-col gap-4 justify-center items-center">
        <div className="text-lg text-red-500">Error al cargar la startup</div>
        <MainButton text="Volver" handleClick={() => router.back()} />
      </div>
    );
  }

  return (
    <div className="h-full my-6 mx-4 flex gap-4">
      <div className="px-3 py-4" onClick={() => router.back()}>
        <ChevronLeft />
      </div>
      <div className="flex flex-col gap-4">
        <p className="text-[36px] font-[600]">{startup.name}</p>
        <p>{startup.description}</p>

        <div className="flex gap-2">
          <p>Equipo responsable:</p>
          <p>{startup.teamId.name}</p>
        </div>

        {/* Presentación de sprints o módulos */}
        <div className="bg-white dark:bg-neutral-1 border border-neutral-3 rounded-[12px] overflow-hidden">
          <div className="p-6">
            {viewingModulesIndex !== null ? (
              // Vista de módulos
              <>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-4">
                    <button
                      onClick={handleBackToSprints}
                      className="text-blue-500 hover:text-blue-700 text-sm font-medium"
                    >
                      ← Volver a Sprints
                    </button>
                    <h2 className="text-xl font-semibold text-neutral-8 dark:text-neutral-2">
                      Módulos del Sprint {viewingModulesIndex + 1}
                    </h2>
                  </div>
                  {user?.roles.includes('TEAMLEADER') && (
                    <div className="cursor-pointer" onClick={handleAddModule}>
                      <PlusIcon />
                    </div>
                  )}
                </div>

                {/* Encabezados de módulos */}
                <div className="grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_1fr] gap-4 p-3 bg-[#FFEAEA] rounded-t-[12px] text-sm font-medium">
                  <div>N°</div>
                  <div>Módulo</div>
                  <div>Tarea</div>
                  <div>Responsable</div>
                  <div>Estado</div>
                  <div>Fecha límite</div>
                  <div>Opciones</div>
                </div>

                {/* Fila de agregar nuevo módulo */}
                {isAddingModule && (
                  <div className="flex gap-2">
                    <div className="flex-1 grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_1fr] gap-4 p-3 bg-green-50 border border-green-300 rounded-[12px] text-sm">
                      <div className="flex items-center">
                        {(startup.sprints?.[viewingModulesIndex]?.modules?.length || 0) + 1}
                      </div>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newModule.name}
                          onChange={(e) => setNewModule({...newModule, name: e.target.value})}
                          placeholder="Nombre del módulo"
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newModule.task}
                          onChange={(e) => setNewModule({...newModule, task: e.target.value})}
                          placeholder="Descripción de la tarea"
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center relative" ref={employeeDropdownRef}>
                         <input
                           type="text"
                           value={employeeSearchTerm || newModule.responsibleName}
                           onChange={(e) => {
                             setEmployeeSearchTerm(e.target.value);
                             setShowEmployeeDropdown(true);
                             setNewModule({...newModule, responsibleName: e.target.value, responsible: ''});
                           }}
                           onFocus={() => setShowEmployeeDropdown(true)}
                           placeholder="Buscar responsable..."
                           className="w-full px-2 py-1 border rounded text-xs"
                         />
                         {showEmployeeDropdown && (
                           <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b max-h-32 overflow-y-auto z-10 shadow-lg">
                             {employees
                               .filter(emp => 
                                 emp.userId.name.toLowerCase().includes((employeeSearchTerm || '').toLowerCase())
                               )
                               .map(employee => (
                                 <div
                                   key={employee.id}
                                   className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-xs"
                                   onClick={() => {
                                     setNewModule({
                                       ...newModule, 
                                       responsible: employee.id,
                                       responsibleName: employee.userId.name
                                     });
                                     setEmployeeSearchTerm('');
                                     setShowEmployeeDropdown(false);
                                   }}
                                 >
                                   {employee.userId.name}
                                 </div>
                               ))
                             }
                             {employees.filter(emp => 
                               emp.userId.name.toLowerCase().includes((employeeSearchTerm || '').toLowerCase())
                             ).length === 0 && (
                               <div className="px-2 py-1 text-gray-500 text-xs">
                                 No se encontraron empleados
                               </div>
                             )}
                           </div>
                         )}
                       </div>
                      <div className="flex items-center">
                        <select
                          value={newModule.status}
                          onChange={(e) => setNewModule({...newModule, status: e.target.value as "pending" | "in_progress" | "completed" | "blocked"})}
                          className="w-full px-2 py-1 border rounded text-xs"
                        >
                          <option value="PENDING">Pendiente</option>
                          <option value="IN_PROGRESS">En progreso</option>
                          <option value="COMPLETED">Completado</option>
                          <option value="BLOCKED">Bloqueado</option>
                        </select>
                      </div>
                      <div className="flex items-center">
                        <input
                          type="date"
                          value={newModule.deadline}
                          onChange={(e) => setNewModule({...newModule, deadline: e.target.value})}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center">
                        <button
                          onClick={handleCancelAddModule}
                          className="text-red-500 hover:text-red-700 mr-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="cursor-pointer" onClick={handleConfirmAddModule}>
                      <CheckIcon />
                    </div>
                  </div>
                )}

                {/* Filas de módulos */}
                {startup.sprints?.[viewingModulesIndex]?.modules && startup.sprints[viewingModulesIndex].modules.length > 0 ? (
                  startup.sprints[viewingModulesIndex].modules.map((module, moduleIndex) => {
                    const moduleStatusMap: Record<string, string> = {
                      PENDING: "Pendiente",
                      IN_PROGRESS: "En progreso",
                      COMPLETED: "Completado",
                      BLOCKED: "Bloqueado",
                    };

                    const isEditingModule = editingModuleIndex === moduleIndex;

                    return (
                      <div key={moduleIndex} className="flex gap-2">
                        {isEditingModule ? (
                          // Fila de edición de módulo
                          <>
                            <div className="flex-1 grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_1fr] gap-4 p-3 bg-blue-50 border border-blue-300 rounded-[12px] text-sm">
                              <div className="flex items-center">
                                {moduleIndex + 1}
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={editingModule.name}
                                  onChange={(e) => setEditingModule({...editingModule, name: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={editingModule.task}
                                  onChange={(e) => setEditingModule({...editingModule, task: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div className="flex items-center relative" ref={editEmployeeDropdownRef}>
                                <input
                                  type="text"
                                  value={editEmployeeSearchTerm || editingModule.responsibleName}
                                  onChange={(e) => {
                                    setEditEmployeeSearchTerm(e.target.value);
                                    setShowEditEmployeeDropdown(true);
                                    setEditingModule({...editingModule, responsibleName: e.target.value, responsible: ''});
                                  }}
                                  onFocus={() => setShowEditEmployeeDropdown(true)}
                                  placeholder="Buscar responsable..."
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                                {showEditEmployeeDropdown && (
                                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-b max-h-32 overflow-y-auto z-10 shadow-lg">
                                    {employees
                                      .filter(emp => 
                                        emp.userId.name.toLowerCase().includes((editEmployeeSearchTerm || '').toLowerCase())
                                      )
                                      .map(employee => (
                                        <div
                                          key={employee.id}
                                          className="px-2 py-1 hover:bg-gray-100 cursor-pointer text-xs"
                                          onClick={() => {
                                            setEditingModule({
                                              ...editingModule, 
                                              responsible: employee.id,
                                              responsibleName: employee.userId.name
                                            });
                                            setEditEmployeeSearchTerm('');
                                            setShowEditEmployeeDropdown(false);
                                          }}
                                        >
                                          {employee.userId.name}
                                        </div>
                                      ))
                                    }
                                    {employees.filter(emp => 
                                      emp.userId.name.toLowerCase().includes((editEmployeeSearchTerm || '').toLowerCase())
                                    ).length === 0 && (
                                      <div className="px-2 py-1 text-gray-500 text-xs">
                                        No se encontraron empleados
                                      </div>
                                    )}
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center">
                                <select
                                  value={editingModule.status}
                                  onChange={(e) => setEditingModule({...editingModule, status: e.target.value as "pending" | "in_progress" | "completed" | "blocked"})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                >
                                  <option value="PENDING">Pendiente</option>
                                  <option value="IN_PROGRESS">En progreso</option>
                                  <option value="COMPLETED">Completado</option>
                                  <option value="BLOCKED">Bloqueado</option>
                                </select>
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="date"
                                  value={editingModule.deadline}
                                  onChange={(e) => setEditingModule({...editingModule, deadline: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={handleCancelEditModule}
                                  className="text-red-500 hover:text-red-700 mr-2"
                                >
                                  ✕
                                </button>
                              </div>
                            </div>
                            <div className="cursor-pointer" onClick={handleConfirmEditModule}>
                              <CheckIcon />
                            </div>
                          </>
                        ) : (
                          // Fila normal de módulo
                          <>
                            <div className="flex-1 grid grid-cols-[0.5fr_2fr_2fr_1.5fr_1fr_1fr_1fr] gap-4 p-3 bg-white dark:bg-neutral-1 border border-neutral-3 rounded-[12px] text-sm text-neutral-7">
                              <div className="flex items-center">
                                {moduleIndex + 1}
                              </div>
                              <div className="flex items-center">
                                {module.name || "Sin nombre"}
                              </div>
                              <div className="flex items-center">
                                {module.task || "Sin descripción"}
                              </div>
                              <div className="flex items-center">
                                {module.responsible?.userId?.name || "Sin asignar"}
                              </div>
                              <div className="flex items-center">
                                <span className={`px-2 py-1 rounded text-xs ${
                                  module.status === 'COMPLETED' ? 'bg-green-100 text-green-800' :
                                  module.status === 'IN_PROGRESS' ? 'bg-blue-100 text-blue-800' :
                                  module.status === 'BLOCKED' ? 'bg-red-100 text-red-800' :
                                  'bg-gray-100 text-gray-800'
                                }`}>
                                  {moduleStatusMap[module.status] || "Sin estado"}
                                </span>
                              </div>
                              <div className="flex items-center">
                                {module.deadline
                                  ? getFormattedDate(module.deadline)
                                  : "Sin fecha"}
                              </div>
                              <div className="flex items-center">
                                {/* Placeholder para opciones */}
                              </div>
                            </div>
                            {user?.roles.includes('TEAMLEADER') && (
                              <div className="cursor-pointer" onClick={() => handleEditModule(moduleIndex)}>
                                <EditIcon />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-neutral-5 bg-white dark:bg-neutral-1 border border-neutral-3 rounded-[12px]">
                    No hay módulos definidos para este sprint
                  </div>
                )}
              </>
            ) : (
              // Vista de sprints
              <>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-neutral-8 dark:text-neutral-2">
                    Presentación de Sprints
                  </h2>
                </div>

                {/* Encabezados */}
                <div className="flex gap-2">
                  <div className="flex-1 grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-3 bg-[#FFEAEA] rounded-[12px] text-sm font-medium">
                    <div>Sprint</div>
                    <div>Entregable</div>
                    <div>Fecha inicio</div>
                    <div>Fecha fin</div>
                    <div>Estado</div>
                    <div>Avance %</div>
                    <div>Opciones</div>
                    
                  </div>
                  {user?.roles.includes('TEAMLEADER') && (
                      <div className="cursor-pointer" onClick={handleAddSprint}>
                        <PlusIcon />
                      </div>
                    )}
                </div>
                {/* Fila de agregar nuevo sprint */}
                {isAddingSprint && (
                  <div className="flex gap-2 mb-2">
                    <div className="flex-1 grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-3 bg-green-50 border border-green-300 rounded-[12px] text-sm">
                      <div className="flex items-center">
                        Sprint {(startup.sprints?.length || 0) + 1}
                      </div>
                      <div className="flex items-center">
                        <input
                          type="text"
                          value={newSprint.name || newSprint.deliverable}
                          onChange={(e) => setNewSprint({...newSprint, name: e.target.value, deliverable: e.target.value})}
                          placeholder="Nombre del sprint"
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="date"
                          value={newSprint.startDate}
                          onChange={(e) => setNewSprint({...newSprint, startDate: e.target.value})}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center">
                        <input
                          type="date"
                          value={newSprint.endDate}
                          onChange={(e) => setNewSprint({...newSprint, endDate: e.target.value})}
                          className="w-full px-2 py-1 border rounded text-xs"
                        />
                      </div>
                      <div className="flex items-center">
                        <select
                          value={newSprint.status}
                          onChange={(e) => setNewSprint({...newSprint, status: e.target.value as "planned" | "in_progress" | "completed" | "delayed"})}
                          className="w-full px-2 py-1 border rounded text-xs"
                        >
                          <option value="PLANNED">Planificado</option>
                          <option value="IN_PROGRESS">En progreso</option>
                          <option value="COMPLETED">Completado</option>
                          <option value="DELAYED">Retrasado</option>
                        </select>
                      </div>
                      <div className="flex items-center">0%</div>
                      <div className="flex items-center">
                        <button
                          onClick={handleCancelAddSprint}
                          className="text-red-500 hover:text-red-700 mr-2"
                        >
                          ✕
                        </button>
                      </div>
                    </div>
                    <div className="cursor-pointer" onClick={handleConfirmAddSprint}>
                      <CheckIcon />
                    </div>
                  </div>
                )}

                {/* Filas de datos */}
                {startup.sprints && startup.sprints.length > 0 ? (
                  startup.sprints.map((sprint, index) => {
                    // Calcular el porcentaje de avance basado en módulos completados
                    const totalModules = sprint.modules?.length || 0;
                    const completedModules =
                      sprint.modules?.filter(
                        (module) => module.status === "COMPLETED"
                      ).length || 0;
                    const progressPercentage =
                      totalModules > 0
                        ? Math.round((completedModules / totalModules) * 100)
                        : 0;

                    // Mapear estado del sprint
                    const statusMap: Record<string, string> = {
                      PLANNED: "Planificado",
                      IN_PROGRESS: "En progreso",
                      COMPLETED: "Completado",
                      DELAYED: "Retrasado",
                    };

                    const isEditing = editingSprintIndex === index;

                    return (
                      <div key={index} className="flex gap-2 mb-2">
                        {isEditing ? (
                          // Fila de edición
                          <>
                            <div className="flex-1 grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-3 bg-blue-50 border border-blue-300 rounded-[12px] text-sm">
                              <div className="flex items-center">
                                {editingSprint.orderNumber}
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="text"
                                  value={editingSprint.name || editingSprint.deliverable}
                                  onChange={(e) => setEditingSprint({...editingSprint, name: e.target.value, deliverable: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="date"
                                  value={editingSprint.startDate}
                                  onChange={(e) => setEditingSprint({...editingSprint, startDate: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div className="flex items-center">
                                <input
                                  type="date"
                                  value={editingSprint.endDate}
                                  onChange={(e) => setEditingSprint({...editingSprint, endDate: e.target.value})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                />
                              </div>
                              <div className="flex items-center">
                                <select
                                  value={editingSprint.status}
                                  onChange={(e) => setEditingSprint({...editingSprint, status: e.target.value as "planned" | "in_progress" | "completed" | "delayed"})}
                                  className="w-full px-2 py-1 border rounded text-xs"
                                >
                                  <option value="PLANNED">Planificado</option>
                                  <option value="IN_PROGRESS">En progreso</option>
                                  <option value="COMPLETED">Completado</option>
                                  <option value="DELAYED">Retrasado</option>
                                </select>
                              </div>
                              <div className="flex items-center">{progressPercentage}%</div>
                              <div className="flex items-center">
                                <button
                                  onClick={handleCancelEditSprint}
                                  className="text-red-500 hover:text-red-700 mr-2"
                                >
                                  ✕
                                </button>
                                <button
                                  onClick={() => handleViewModules(index)}
                                  className="text-blue-500 hover:text-blue-700 text-xs"
                                >
                                  ver tareas
                                </button>
                              </div>
                            </div>
                            <div className="cursor-pointer" onClick={handleConfirmEditSprint}>
                              <CheckIcon />
                            </div>
                          </>
                        ) : (
                          // Fila normal
                          <>
                            <div className="flex-1 grid grid-cols-[1fr_2fr_1fr_1fr_1fr_1fr_1fr] gap-4 p-3 bg-white dark:bg-neutral-1 border border-neutral-3 rounded-[12px] text-sm text-neutral-7">
                              <div className="flex items-center">
                                {sprint.orderNumber || index + 1}
                              </div>
                              <div className="flex items-center">
                                {sprint.deliverable ||
                                  sprint.name ||
                                  "Sin entregable definido"}
                              </div>
                              <div className="flex items-center">
                                {sprint.startDate
                                  ? getFormattedDate(sprint.startDate)
                                  : "Sin fecha límite"}
                              </div>
                              <div className="flex items-center">
                                {sprint.endDate
                                  ? getFormattedDate(sprint.endDate)
                                  : "Sin fecha límite"}
                              </div>
                              <div className="flex items-center">
                                {statusMap[sprint.status] || "Sin estado"}
                              </div>
                              <div className="flex items-center">
                                {progressPercentage}%
                              </div>
                              <div className="flex items-center">
                                <button
                                  onClick={() => handleViewModules(index)}
                                  className="text-blue-500 hover:text-blue-700 text-xs"
                                >
                                  ver tareas
                                </button>
                              </div>
                            </div>
                            {user?.roles.includes('TEAMLEADER') && (
                              <div className="cursor-pointer" onClick={() => handleEditSprint(index)}>
                                <EditIcon />
                              </div>
                            )}
                          </>
                        )}
                      </div>
                    );
                  })
                ) : (
                  <div className="p-6 text-center text-neutral-5 bg-white dark:bg-neutral-1 border border-neutral-3 rounded-[12px]">
                    No hay sprints definidos para esta startup
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      </div>
    );
  }
