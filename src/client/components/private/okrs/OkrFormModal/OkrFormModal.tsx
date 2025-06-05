import { useEffect, useState } from "react";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrTextInput } from "../OkrTextInput";
import { OkrTextareaInput } from "../OkrTextareaInput";
import { OkrDateInput } from "../OkrDateInput";
import { useMutation } from "@apollo/client";
import {
  CREATE_OKR_MUTATION,
  UPDATE_OKR_MUTATION,
  DELETE_OKR_MUTATION
} from "@/client/services/okrs";

interface okrProps {
  id: string;
  title: string;
  description: string;
  owner: string;
  status: string;
  startDate: string;
  endDate: string;
  userId: string;
}

export const OkrFormModal = ({
  handleClose,
  handleSubmit,
  okr: passedOkr,
}: Readonly<{
  handleClose: () => void;
  handleSubmit: (okr: okrProps) => void;
  okr?: okrProps;
}>) => {
  const [okr, setOkr] = useState<okrProps>({
    id: "",
    title: "",
    description: "",
    owner: "",
    status: "Pending",
    startDate: "",
    endDate: "",
    userId: "temp-user-id",
  });

  const [isEditing, setIsEditing] = useState(!passedOkr); // crear = editable, ver = no editable
  const isViewMode = !!passedOkr && !isEditing;

  const [createOkr, { loading: creating, error: createError }] = useMutation(CREATE_OKR_MUTATION);
  const [updateOkr, { loading: updating, error: updateError }] = useMutation(UPDATE_OKR_MUTATION);
  const [deleteOkr, { loading: deleting, error: deleteError }] = useMutation(DELETE_OKR_MUTATION);

  useEffect(() => {
    if (passedOkr) {
      setOkr(passedOkr);
    }
  }, [passedOkr]);

  const handleCreate = async () => {
    try {
      const { data } = await createOkr({
        variables: { ...okr },
      });

      if (data?.createOKR) {
        handleSubmit(data.createOKR);
        handleClose();
      }
    } catch (err) {
      console.error("Error creating OKR:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const { data } = await updateOkr({
        variables: {
          id: okr.id,
          title: okr.title,
          description: okr.description,
          owner: okr.owner,
          status: okr.status,
          startDate: okr.startDate,
          endDate: okr.endDate,
          userId: okr.userId,
        },
      });

      if (data?.updateOKR) {
        handleSubmit(data.updateOKR);
        handleClose();
      }
    } catch (err) {
      console.error("Error updating OKR:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const { data } = await deleteOkr({ variables: { id: okr.id } });
      if (data?.deleteOKR) {
        handleClose();
      }
    } catch (err) {
      console.error("Error deleting OKR:", err);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-[#1f1f1f80]" onClick={handleClose} />

      <div className="w-9/12 max-h-11/12 lg:max-h-9/12 overflow-y-auto bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[12px] relative z-10">
        <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
          <h2 className="text-[24px] lg:text-[32px] font-[600]">
            {passedOkr
              ? isEditing
                ? "Editar OKR"
                : "Detalle del OKR"
              : "Agregar nuevo OKR"}
          </h2>
          
        </div>

        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2 ">
          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Responsable</p>
            <OkrTextInput
              label="Responsable"
              value={okr.owner}
              onChange={(value) => setOkr({ ...okr, owner: value })}
              placeholder="Nombres y apellidos del colaborador"
              disabled={isViewMode}
            />
          </div>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Título:</p>
            <OkrTextInput
              label="Título"
              value={okr.title}
              onChange={(value) => setOkr({ ...okr, title: value })}
              placeholder="Título del objetivo"
              disabled={isViewMode}
            />
          </div>

          <OkrTextareaInput
            label="Descripción"
            value={okr.description}
            onChange={(value) => setOkr({ ...okr, description: value })}
            placeholder="Descripción detallada del objetivo"
            disabled={isViewMode}
          />

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Estado:</p>
            <select
              className="border p-2 rounded-lg text-sm bg-neutral-4 dark:bg-neutral-2"
              value={okr.status}
              onChange={(e) =>
                setOkr({ ...okr, status: e.target.value as okrProps["status"] })
              }
              disabled={isViewMode}
            >
              <option value="Pending">Pendiente</option>
              <option value="In Progress">En progreso</option>
              <option value="Completed">Completado</option>
            </select>
          </div>

          <OkrDateInput
            label="Fecha inicio"
            value={okr.startDate}
            onChange={(value) => setOkr({ ...okr, startDate: value })}
            disabled={isViewMode}
          />

          <OkrDateInput
            label="Fecha fin"
            value={okr.endDate}
            onChange={(value) => setOkr({ ...okr, endDate: value })}
            disabled={isViewMode}
          />
        </div>
        {passedOkr && !isEditing && (
          <div className="w-full py-4 px-6 flex justify-center items-center gap-4">
            <MainButton text="Editar" handleClick={() => setIsEditing(true)} />
            <MainButton text={deleting ? "Eliminando..." : "Eliminar"} handleClick={handleDelete} disabled={deleting} />
          </div>
          )}

        {(isEditing || !passedOkr) && (
          <div className="w-full py-4 px-6 flex justify-center items-center">
            <MainButton
              text={
                passedOkr
                  ? updating
                    ? "Guardando..."
                    : "Guardar cambios"
                  : creating
                  ? "Guardando..."
                  : "Agregar nuevo OKR"
              }
              handleClick={passedOkr ? handleUpdate : handleCreate}
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
    </div>
  );
};
