import { useState, useEffect } from "react";
import { useMutation } from "@apollo/client";
import { ApolloQueryResult } from "@apollo/client";
import {
  CREATE_STARTUP_MUTATION,
  UPDATE_STARTUP_METRICS_MUTATION,
  UPDATE_STARTUP_MUTATION,
  DELETE_STARTUP_MUTATION,
} from "@/client/services/startups";
import { ModalLayout } from "@/client/components/shared/ModalLayout";
import { OkrTextInput } from "../../okrs/OkrTextInput";
import { OkrTextareaInput } from "../../okrs/OkrTextareaInput";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { ProgressBar } from "../ProgressBar";

interface IStartup {
  _id: string;
  client: string;
  name: string;
  description: string;
  responsible: string;
  monthlyMetric: string;
  metric: string;
  currentValue: number;
  expectedValue: number;
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
  const [formData, setFormData] = useState({
    _id: "",
    client: "",
    name: "",
    description: "",
    responsible: "",
    monthlyMetric: "",
    metric: "",
    currentValue: 0,
    expectedValue: 0,
  });

  const [isEditing, setIsEditing] = useState(!startup); // crear = editable, ver = no editable
  const isViewMode = !!startup && !isEditing;

  const [createStartup, { loading: creating, error: createError }] = useMutation(CREATE_STARTUP_MUTATION);
  const [updateStartup, { loading: updating, error: updateError }] = useMutation(UPDATE_STARTUP_MUTATION);
  const [updateStartupMetrics, { loading: updatingMetrics, error: updateMetricsError }] = useMutation(UPDATE_STARTUP_METRICS_MUTATION);
  const [deleteStartup, { loading: deleting, error: deleteError }] = useMutation(DELETE_STARTUP_MUTATION);

  useEffect(() => {
    if (startup) {
      setFormData(startup);
    }
  }, [startup]);

  const handleCreate = async () => {
    const {
      client,
      name,
      description,
      responsible,
      monthlyMetric,
      metric,
      currentValue,
      expectedValue,
    } = formData;

    if (
      !client ||
      !name ||
      !description ||
      !responsible ||
      !monthlyMetric ||
      !metric ||
      currentValue === 0 ||
      expectedValue === 0
    ) {
      alert("Por favor, completa todos los campos antes de continuar.");
      return;
    }

    try {
      const { data } = await createStartup({
        variables: {
          client,
          name,
          description,
          responsible,
          monthlyMetric,
          metric,
          currentValue,
          expectedValue,
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
      // Actualizar datos generales
      await updateStartup({
        variables: {
          id: formData._id,
          client: formData.client,
          name: formData.name,
          description: formData.description,
          responsible: formData.responsible,
          monthlyMetric: formData.monthlyMetric,
        },
      });

      // Actualizar métricas
      await updateStartupMetrics({
        variables: {
          id: formData._id,
          metric: formData.metric,
          currentValue: formData.currentValue,
          expectedValue: formData.expectedValue,
        },
      });

      await refetch();
      handleClose();
    } catch (err) {
      console.error("Error updating startup:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteStartup({ variables: { id: formData._id } });
      if (data?.deleteStartup) {
        await refetch();
        handleClose();
      }
    } catch (err) {
      console.error("Error deleting startup:", err);
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
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Cliente</p>
            <OkrTextInput
              label="Cliente"
              value={formData.client}
              onChange={(value) => setFormData({ ...formData, client: value })}
              placeholder="Nombre del cliente"
              disabled={isViewMode}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Nombre</p>
            <OkrTextInput
              label="Nombre"
              value={formData.name}
              onChange={(value) => setFormData({ ...formData, name: value })}
              placeholder="Nombre de la startup"
              disabled={isViewMode}
            />
          </div>

          <OkrTextareaInput
            label="Descripción"
            value={formData.description}
            onChange={(value) =>
              setFormData({ ...formData, description: value })
            }
            placeholder="Descripción detallada de la startup"
            disabled={isViewMode}
          />

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Responsable</p>
            <OkrTextInput
              label="Responsable"
              value={formData.responsible}
              onChange={(value) =>
                setFormData({ ...formData, responsible: value })
              }
              placeholder="Responsable del proyecto"
              disabled={isViewMode}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="max-w-[100px]">Métrica mensual</p>
            <OkrTextInput
              label="Métrica mensual"
              value={formData.monthlyMetric}
              onChange={(value) =>
                setFormData({ ...formData, monthlyMetric: value })
              }
              placeholder="Nombre de la métrica mensual"
              disabled={isViewMode}
            />
          </div>

          <div className="text-[14px]">
            {/* Primer bloque (lectura) */}
            <div className="bg-red-100 mb-3 py-2 px-5 rounded-[12px]">
              <div className="grid grid-cols-6 gap-2 items-center">
                <div className="col-span-1">Métrica</div>
                <div className="col-span-1">Valor actual</div>
                <div className="col-span-1">Valor esperado</div>
                <div className="col-span-1">Porcentaje</div>
                <div className="col-span-2">Barra de progreso </div>
              </div>
            </div>

            {/* Segundo bloque (edición con inputs) */}
            <div className="border border-neutral-300 mb-3 py-2 px-5 rounded-[12px]">
              <div className="grid grid-cols-6 gap-2 items-center">
                <input
                  type="text"
                  placeholder="Métrica"
                  value={formData.metric}
                  onChange={(e) =>
                    setFormData({ ...formData, metric: e.target.value })
                  }
                  className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  disabled={isViewMode}
                />
                <input
                  type="number"
                  placeholder="Valor actual"
                  value={formData.currentValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      currentValue: Number(e.target.value),
                    })
                  }
                  className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  disabled={isViewMode}
                />
                <input
                  type="text"
                  placeholder="Valor esperado"
                  value={formData.expectedValue}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      expectedValue: Number(e.target.value),
                    })
                  }
                  className="col-span-1 border border-gray-300 rounded px-2 py-1"
                  disabled={isViewMode}
                />
                <p className="col-span-1 border border-gray-300 rounded px-2 py-1">
                  {formData.expectedValue === 0
                    ? 0
                    : (
                        (formData.currentValue / formData.expectedValue) *
                        100
                      ).toFixed(1)}
                  %
                </p>

                <div className="col-span-2">
                  <ProgressBar
                    percentage={
                      formData.expectedValue === 0
                        ? 0
                        : parseFloat(
                            (
                              (formData.currentValue / formData.expectedValue) *
                              100
                            ).toFixed(1)
                          )
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {startup && !isEditing && (
          <div className="w-full py-4 px-6 flex justify-center items-center gap-4">
            <MainButton text="Editar" handleClick={() => setIsEditing(true)} />
            <MainButton 
              text={deleting ? "Eliminando..." : "Eliminar"} 
              handleClick={handleDelete} 
              disabled={deleting} 
            />
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

        {(createError || updateError || updateMetricsError || deleteError) && (
          <p className="text-red-500 text-center pb-4">
            Error: {(createError || updateError || updateMetricsError || deleteError)?.message}
          </p>
        )}
      </div>
    </ModalLayout>
  );
};