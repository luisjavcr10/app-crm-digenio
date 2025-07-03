import { useEffect, useState } from "react";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrTextInput } from "../../../shared/formElements/TextInput";
import { OkrTextareaInput } from "../../../shared/formElements/TextareaInput";
import { OkrDateInput } from "../../../shared/formElements/DateInput";
import { useMutation } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import {
  CREATE_OKR_MUTATION,
  UPDATE_OKR_MUTATION,
  DELETE_OKR_MUTATION
} from "@/client/services/okrs";
import { useLazyQuery } from "@apollo/client";
import { GET_DEEPSEEK_RECOMMENDATION } from "@/client/services/ia";

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
  const [activeTab, setActiveTab] = useState<'form' | 'recomendaciones'>('form');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [getRecommendation, { data: recommendationData, loading: loadingRecommendation, error: errorRecommendation }] = useLazyQuery(GET_DEEPSEEK_RECOMMENDATION);


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
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
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
            <MainButton text={deleting ? "Eliminando..." : "Eliminar"} handleClick={handleDelete} disabled={deleting} />          <MainButton text="Recomendaciones para lograr el OKR" handleClick={() => {
              setActiveTab('recomendaciones');
              setShowRecommendations(true);
              getRecommendation({
                variables: {
                  messages: [
                    { role: 'system', content: 'Eres un experto en OKRs. Da recomendaciones para lograr el siguiente OKR.' },
                    { role: 'user', content: `Título: ${okr.title}\nDescripción: ${okr.description}\nResponsable: ${okr.owner}\nEstado: ${okr.status}\nFecha inicio: ${okr.startDate}\nFecha fin: ${okr.endDate}` }
                  ]
                }
              });
            }} />
          </div>
        )}

        {showRecommendations && activeTab === 'recomendaciones' && (
          <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/30 backdrop-blur-[2px] px-4">
            <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-white dark:bg-neutral-900 shadow-xl border border-gray-200 dark:border-neutral-700 p-6 sm:p-8 space-y-6 transition-all duration-300">

              {/* Botón de cerrar */}
              <button
                className="absolute top-4 right-4 text-neutral-500 hover:text-[#FF0024] text-2xl font-bold transition"
                onClick={() => setShowRecommendations(false)}
                aria-label="Cerrar modal de recomendaciones"
              >
                &times;
              </button>

              {/* Título principal */}
              <h3 className="text-3xl font-semibold text-neutral-900 dark:text-white tracking-tight">
                Recomendaciones para lograr el <span className="text-[#FF0024]">OKR</span>
              </h3>

              {/* Información del OKR */}
              <div className="space-y-2 text-neutral-800 dark:text-neutral-200 text-[16px] leading-relaxed">
                <p><span className="font-semibold">Título:</span> {okr.title}</p>
                <p><span className="font-semibold">Descripción:</span> {okr.description}</p>
                <p><span className="font-semibold">Responsable:</span> {okr.owner}</p>
                <p><span className="font-semibold">Estado:</span> {okr.status}</p>
                <p><span className="font-semibold">Fecha inicio:</span> {okr.startDate}</p>
                <p><span className="font-semibold">Fecha fin:</span> {okr.endDate}</p>
              </div>

              {/* Línea decorativa con título central */}
              <div className="relative text-center my-6">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-full border-t border-neutral-300 dark:border-neutral-700"></div>
                </div>
                <span className="relative z-10 bg-white dark:bg-neutral-900 px-4 text-xl font-semibold text-neutral-900 dark:text-white">
                  Recomendaciones IA
                </span>
              </div>

              {/* Contenido de IA */}
              {loadingRecommendation && <p className="text-neutral-500">Cargando recomendaciones...</p>}
              {errorRecommendation && (
                <p className="text-[#FF0024]">Error: {errorRecommendation.message}</p>
              )}
              {recommendationData?.getDeepSeekRecommendation?.choices?.[0]?.message?.content && (
                <div className="prose dark:prose-invert max-w-none bg-neutral-50 dark:bg-neutral-800 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700 text-neutral-900 dark:text-neutral-100 leading-relaxed">
                  <ReactMarkdown>
                    {recommendationData.getDeepSeekRecommendation.choices[0].message.content}
                  </ReactMarkdown>
                </div>
              )}
            </div>
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

