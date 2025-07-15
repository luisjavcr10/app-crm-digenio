import { useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { ApolloQueryResult } from "@apollo/client";
import {
  CREATE_STARTUP_MUTATION,
  UPDATE_STARTUP_MUTATION,
  DELETE_STARTUP_MUTATION,
  UPDATE_STARTUP_STATUS_MUTATION,
} from "@/client/services/startups";
import { GET_OKRS_QUERY } from "@/client/services/okrs";
import { ID_NAME_TEAMS } from "@/client/services/employees";
import { ModalLayout } from "@/client/components/shared/modal";
import {FormSection} from "../../../shared/formElements/FormSection";
import {TextInput, TextareaInput} from "../../../shared/formElements";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { useAuth } from "@/client/hooks/useAuth";

interface IStartup {
  _id: string;
  name: string;
  description: string;
  okrId: {
    _id: string;
    name: string;
  };
  teamId: {
    _id: string;
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
        _id: string;
        name: string;
      };
      status: string;
      deadline?: string;
    }[];
  }[];
  createdAt: string;
  updatedAt: string;
}

interface ISprint {
  orderNumber: number;
  name: string;
}

interface IOKR {
  id: string;
  name: string;
}

interface ITeam {
  id: string;
  name: string;
}

export const StartupModal = ({
  startup,
  handleClose,
  refetch,
}: Readonly<{
  startup?: IStartup;
  handleClose: () => void;
  refetch: () => Promise<ApolloQueryResult<{ getAllStartups: IStartup[] }>>;
}>) => {
  const {user} = useAuth();
  const [formData, setFormData] = useState({
    _id: "",
    name: "",
    description: "",
    okrId: "",
    teamId: "",
    sprints: [] as ISprint[],
  });

  const [newSprint, setNewSprint] = useState({ orderNumber: 1, name: "" });
  const [validationAction, setValidationAction] = useState<'accept' | 'observe' | 'reject' | null>(null);
  const [observationText, setObservationText] = useState("");

  const [isEditing, setIsEditing] = useState(!startup); // crear = editable, ver = no editable
  const isViewMode = !!startup && !isEditing;

  const [createStartup, { loading: creating, error: createError }] = useMutation(CREATE_STARTUP_MUTATION);
  const [updateStartup, { loading: updating, error: updateError }] = useMutation(UPDATE_STARTUP_MUTATION);
  const [deleteStartup, { loading: deleting, error: deleteError }] = useMutation(DELETE_STARTUP_MUTATION);
  const [updateStartupStatus, { loading: validating }] = useMutation(UPDATE_STARTUP_STATUS_MUTATION);

  const { data: okrsData } = useQuery<{ okrs: IOKR[] }>(GET_OKRS_QUERY);
  const { data: teamsData } = useQuery<{ teams: ITeam[] }>(ID_NAME_TEAMS);

  useEffect(() => {
    if (startup) {
      setFormData({
        _id: startup._id,
        name: startup.name,
        description: startup.description,
        okrId: startup.okrId._id,
        teamId: startup.teamId._id,
        sprints: startup.sprints.map(s => ({ orderNumber: s.orderNumber, name: s.name })),
      });
      setObservationText(startup.observation || "");
    }
    setValidationAction(null);
  }, [startup]);

  const addSprint = () => {
    if (newSprint.name.trim()) {
      setFormData({
        ...formData,
        sprints: [...formData.sprints, { ...newSprint }]
      });
      setNewSprint({ orderNumber: newSprint.orderNumber + 1, name: "" });
    }
  };

  const removeSprint = (index: number) => {
    const updatedSprints = formData.sprints.filter((_, i) => i !== index);
    setFormData({ ...formData, sprints: updatedSprints });
  };

  const handleCreate = async () => {
    const { name, description, okrId, teamId, sprints } = formData;

    if (!name || !description || !okrId || !teamId || sprints.length === 0) {
      alert("Por favor, completa todos los campos requeridos y agrega al menos un sprint.");
      return;
    }

    try {
      const { data } = await createStartup({
        variables: {
          input: {
            name,
            description,
            okrId,
            teamId,
            sprints,
          },
        },
      });

      if (data?.createStartup) {
        await refetch();
        handleClose();
      }
    } catch (err) {
      console.error("Error creating startup:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      await updateStartup({
        variables: {
          id: formData._id,
          input: {
            name: formData.name,
            description: formData.description,
            okrId: formData.okrId,
            teamId: formData.teamId,
            sprints: formData.sprints,
          },
        },
      });

      await refetch();
      handleClose();
    } catch (err) {
      console.error("Error updating startup:", err);
    }
  };

  const handleDelete = async () => {
    if (!startup) return;
    try {
      const { data } = await deleteStartup({ variables: { id: startup._id } });
      if (data?.deleteStartup) {
        await refetch();
        handleClose();
      }
    } catch (err) {
      console.error("Error deleting startup:", err);
    }
  };

  const handleValidation = async () => {
    if (!startup || !validationAction) return;
    
    try {
      let status;
      let observation;
      
      switch (validationAction) {
        case 'accept':
          status = 'IN_PROGRESS';
          break;
        case 'observe':
          status = 'IDEA_OBSERVED';
          observation = observationText;
          break;
        case 'reject':
          status = 'IDEA_REJECTED';
          break;
        default:
          return;
      }
      
      await updateStartupStatus({
        variables: {
          id: startup._id,
          status,
          observation
        }
      });
      
      await refetch();
      handleClose();
    } catch (error) {
      console.error("Error validating startup:", error);
    }
  };

  return (
    <ModalLayout onClose={handleClose}>
      <div>
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
          <h2 className="text-[24px] lg:text-[32px] font-[600]">
            {startup
              ? isEditing
                ? "Editar Startup"
                : "Detalle de la Startup"
              : "Agregar nueva Startup"}
          </h2>
        </div>

        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2">
          <FormSection>
            <p className="w-[100px]">Nombre</p>
            <TextInput
              label="Nombre"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="Nombre de la startup"
              disabled={isViewMode}
            />
          </FormSection>

          <FormSection>
            <p className="w-[100px]">Descripción</p>
            <TextareaInput
              label="Descripción"
              value={formData.description}
              onChange={(value) =>
                setFormData({ ...formData, description: value })
              }
              placeholder="Descripción detallada de la startup"
              disabled={isViewMode}
            />
          </FormSection>

          <FormSection>
            <p className="min-w-[100px]">OKR</p>
            <select
              value={formData.okrId}
              onChange={(e) => setFormData({ ...formData, okrId: e.target.value })}
              className="flex-1 px-4 py-2 border border-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isViewMode}
            >
              <option value="">Selecciona un OKR</option>
              {okrsData?.okrs.map((okr) => (
                <option key={okr.id} value={okr.id}>
                  {okr.name}
                </option>
              ))}
            </select>
          </FormSection>

          <FormSection>
            <p className="min-w-[100px]">Equipo</p>
            <select
              value={formData.teamId}
              onChange={(e) => setFormData({ ...formData, teamId: e.target.value })}
              className="flex-1 px-4 py-2 border border-neutral-3 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
              disabled={isViewMode}
            >
              <option value="">Selecciona un equipo</option>
              {teamsData?.teams.map((team) => (
                <option key={team.id} value={team.id}>
                  {team.name}
                </option>
              ))}
            </select>
          </FormSection>

          <div className="flex flex-col gap-4">
            <p className="font-semibold">Sprints</p>
            
            {/* Lista de sprints existentes */}
            {formData.sprints.map((sprint, index) => (
              <div key={index} className="flex items-center gap-4 p-3 border border-neutral-3 rounded-lg">
                <span className="font-medium">#{sprint.orderNumber}</span>
                <span className="flex-1">{sprint.name}</span>
                {!isViewMode && (
                  <button
                    onClick={() => removeSprint(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                    Eliminar
                  </button>
                )}
              </div>
            ))}

            {/* Agregar nuevo sprint */}
            {!isViewMode && (
              <div className="flex items-center gap-4 p-3 border-2 border-dashed border-neutral-3 rounded-lg">
                <span className="font-medium">#{newSprint.orderNumber}</span>
                <input
                  type="text"
                  value={newSprint.name}
                  onChange={(e) => setNewSprint({ ...newSprint, name: e.target.value })}
                  placeholder="Nombre del sprint"
                  className="flex-1 px-3 py-2 border border-neutral-3 rounded focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <button
                  onClick={addSprint}
                  className="px-4 py-2 bg-primary-500 text-white rounded hover:bg-primary-600"
                >
                  Agregar
                </button>
              </div>
            )}
          </div>
        </div>
        
        {user.roles.includes("ADMIN") && startup?.status==="IDEA_PENDING_REVIEW" &&(
          <div className="px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
            <div className="mb-4 flex gap-4">
              <p className="w-[200px]">Opciones de validación</p>
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setValidationAction('accept')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    validationAction === 'accept'
                      ? 'bg-[#FFEAEA]'
                      : 'border border-neutral-3 text-neutral-7 dark:text-neutral-3 hover:bg-green-100 dark:hover:bg-green-900'
                  }`}
                >
                  ACEPTAR
                </button>
                <button
                  type="button"
                  onClick={() => setValidationAction('observe')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    validationAction === 'observe'
                      ? 'bg-[#FFEAEA]'
                      : 'border border-neutral-3 text-neutral-7 dark:text-neutral-3 hover:bg-yellow-100 dark:hover:bg-yellow-900'
                  }`}
                >
                  OBSERVAR
                </button>
                <button
                  type="button"
                  onClick={() => setValidationAction('reject')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    validationAction === 'reject'
                      ? 'bg-[#FFEAEA]'
                      : 'border border-neutral-3 text-neutral-7 dark:text-neutral-3 hover:bg-red-100 dark:hover:bg-red-900'
                  }`}
                >
                  RECHAZAR
                </button>
              </div>
            </div>
            {validationAction === 'observe' && (
              <div className="flex gap-4">
                <p className="w-[200px]">Observaciones a levantar</p>
                <textarea
                  value={observationText}
                  onChange={(e) => setObservationText(e.target.value)}
                  placeholder="Ingrese las observaciones que debe levantar la startup..."
                  className="flex-1 p-3 border border-neutral-3 dark:border-neutral-6 rounded-lg bg-white dark:bg-neutral-8 text-neutral-8 dark:text-neutral-2 placeholder-neutral-5 dark:placeholder-neutral-5 focus:outline-none focus:ring-2 focus:ring-primary-5 focus:border-transparent resize-none"
                  rows={4}
                />
              </div>
            )}
          </div>
        )}

        {startup && !isEditing && (
          <div className="w-full py-4 px-6 flex justify-center items-center gap-4 border-t border-neutral-4">
            {user.roles.includes("TEAMLEADER") && (
              <>
                <MainButton text="Editar" handleClick={() => setIsEditing(true)} />
                <MainButton 
                  text={deleting ? "Eliminando..." : "Eliminar"} 
                  handleClick={handleDelete} 
                  disabled={deleting} 
                />
              </>
            )}
            {user.roles.includes("ADMIN") && startup.status==="IDEA_PENDING_REVIEW" && validationAction &&(
              <MainButton 
                text="Confirmar validación" 
                handleClick={handleValidation} 
                disabled={validating || (validationAction === 'observe' && !observationText.trim())} 
              />
            )}
          </div>
        )}

        {(isEditing || !startup) && (
          <div className="flex justify-center gap-4 p-6">
            <MainButton
              handleClick={startup ? handleUpdate : handleCreate}
              text={
                startup
                  ? updating
                    ? "Guardando..."
                    : "Guardar cambios"
                  : creating
                  ? "Creando..."
                  : "Agregar nueva startup"
              }
              disabled={creating || updating}
            />
          </div>
        )}

        {(createError || updateError || deleteError) && (
          <p className="text-red-500 text-center pb-4">
            Error: {(createError || updateError || deleteError)?.message}
          </p>
        )}
      </div>
    </ModalLayout>
  );
};