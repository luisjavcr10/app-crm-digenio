import { useEffect, useState } from "react";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import {TextInput, TextareaInput, DateInput, FormSection} from "@/client/components/shared/formElements";
import { useLazyQuery } from "@apollo/client";
import ReactMarkdown from "react-markdown";
import { GET_DEEPSEEK_RECOMMENDATION } from "@/client/services/ia";
import { useOkrOperations } from "../hooks/useOkrOperations";
import { OkrValidationMessage } from "../components/OkrValidationMessage";
import { useAuth } from "@/client/hooks/useAuth";

import type { OkrProps, OkrStatus } from "@/client/types/okr";


export const OkrFormModal = ({
  handleClose,
  handleSubmit,
  okr: passedOkr,
  onDelete,
}: Readonly<{
  handleClose: () => void;
  handleSubmit: (okr: OkrProps) => void;
  okr?: OkrProps;
  onDelete?: (okrId: string) => Promise<void>;
}>) => {
  const { user } = useAuth();

  const [okr, setOkr] = useState<OkrProps>({
    id: "",
    name: "",
    description: "",
    status: "draft",
    startDate: "",
    endDate: "",
    userId: user.id,
  });

  const [isEditing, setIsEditing] = useState(!passedOkr);
  const isViewMode = !!passedOkr && !isEditing;

  const {
    createDraftOkr,
    createPendingOkr,
    updateExistingOkr,
    confirmDraftOkr,
    deleteExistingOkr,
    canConfirmOkr,
    canEditOkr,
    canDeleteOkr,
    creating,
    updating,
    deleting,
    createError,
    updateError,
    deleteError,
  } = useOkrOperations();
  const [activeTab, setActiveTab] = useState<'form' | 'recomendaciones'>('form');
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [getRecommendation, { data: recommendationData, loading: loadingRecommendation, error: errorRecommendation }] = useLazyQuery(GET_DEEPSEEK_RECOMMENDATION);

  useEffect(() => {
    if (passedOkr) {
      setOkr(passedOkr);
    }
  }, [passedOkr]);

  const handleCreateDraft = async () => {
    try {
      const result = await createDraftOkr(okr, okr.userId);
      if (result) {
        handleSubmit(result);
        handleClose();
      }
    } catch (err) {
      console.error("Error creating draft OKR:", err);
    }
  };

  const handleCreatePending = async () => {
    try {
      const result = await createPendingOkr(okr, okr.userId);
      if (result) {
        handleSubmit(result);
        handleClose();
      }
    } catch (err) {
      console.error("Error creating pending OKR:", err);
    }
  };

  const handleUpdate = async () => {
    try {
      const result = await updateExistingOkr(okr.id, okr);
      if (result) {
        handleSubmit(result);
        handleClose();
      }
    } catch (err) {
      console.error("Error updating OKR:", err);
    }
  };

  const handleConfirm = async () => {
    try {
      const result = await confirmDraftOkr(okr);
      if (result) {
        handleSubmit(result);
        handleClose();
      }
    } catch (err) {
      console.error("Error confirming OKR:", err);
    }
  };

  const handleDelete = async () => {
    try {
      const result = await deleteExistingOkr(okr.id);
      if (result) {
        onDelete?.(okr.id);
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
          {/* Mensaje de validación para crear OKR pendiente */}
          {!passedOkr && (
            <OkrValidationMessage okr={okr} showForPending={true} />
          )}
          
          {/* Mensaje de validación para confirmar draft */}
          {passedOkr && okr.status === 'draft' && !isEditing && (
            <OkrValidationMessage okr={okr} showForPending={true} />
          )}

          <FormSection>
            <p className="w-[100px]">Título</p>
            <TextInput
              label="Título"
              value={okr.name}
              onChange={(value) => setOkr({ ...okr, name: value })}
              placeholder="Título del objetivo"
              disabled={isViewMode}
            />
          </FormSection>

          <FormSection>
            <p className="w-[100px]">Descripcion</p>
            <TextareaInput
              label="Descripción"
              value={okr.description}
              onChange={(value) => setOkr({ ...okr, description: value })}
              placeholder="Descripción detallada del objetivo"
              disabled={isViewMode}
            />
          </FormSection>

          <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
            <p className="min-w-[100px]">Estado:</p>
            <select
              className="border p-2 rounded-lg text-sm bg-neutral-4 dark:bg-neutral-2"
              value={okr.status}
              onChange={(e) =>
                setOkr({ ...okr, status: e.target.value as OkrStatus })
              }
              disabled={isViewMode || (passedOkr && okr.status === 'completed')}
            >
              <option value="draft">Borrador</option>
              <option value="pending">Pendiente</option>
              <option value="in_progress">En progreso</option>
              <option value="completed">Completado</option>
            </select>
          </div>

          <DateInput
            label="Fecha inicio"
            value={okr.startDate}
            onChange={(value) => setOkr({ ...okr, startDate: value })}
            disabled={isViewMode}
          />

          <DateInput
            label="Fecha fin"
            value={okr.endDate}
            onChange={(value) => setOkr({ ...okr, endDate: value })}
            disabled={isViewMode}
          />
        </div>

        {passedOkr && !isEditing && (
          <div className="w-full py-4 px-6 flex justify-center items-center gap-4 flex-wrap">
            {user.roles.includes("ADMIN") && canEditOkr(okr.status) && (
              <MainButton text="Editar" handleClick={() => setIsEditing(true)} />
            )}
            
            {user.roles.includes("ADMIN") && okr.status === 'draft' && canConfirmOkr(okr) && (
              <MainButton 
                text={updating ? "Confirmando..." : "Confirmar OKR"} 
                handleClick={handleConfirm} 
                disabled={updating}
              />
            )}
            
            {user.roles.includes("ADMIN") && canDeleteOkr(okr.status) && (
              <MainButton 
                text={deleting ? "Eliminando..." : "Eliminar"} 
                handleClick={handleDelete} 
                disabled={deleting}
              />
            )}
            
            <MainButton text="Recomendaciones para lograr el OKR" handleClick={() => {
              setActiveTab('recomendaciones');
              setShowRecommendations(true);
              getRecommendation({
                variables: {
                  messages: [
                    { role: 'system', content: 'Eres un experto en OKRs. Da recomendaciones para lograr el siguiente OKR.' },
                    { role: 'user', content: `Título: ${okr.name}\nDescripción: ${okr.description}\nEstado: ${okr.status}\nFecha inicio: ${okr.startDate}\nFecha fin: ${okr.endDate}` }
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
                <p><span className="font-semibold">Título:</span> {okr.name}</p>
                <p><span className="font-semibold">Descripción:</span> {okr.description}</p>
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
          <div className="w-full py-4 px-6 flex justify-center items-center gap-4 flex-wrap">
            {passedOkr ? (
              <MainButton
                text={updating ? "Guardando..." : "Guardar cambios"}
                handleClick={handleUpdate}
                disabled={updating}
              />
            ) : (
              <>
                <MainButton
                  text={creating ? "Guardando..." : "Guardar como Borrador"}
                  handleClick={handleCreateDraft}
                  disabled={creating}
                />
                <MainButton
                  text={creating ? "Guardando..." : "Crear OKR Pendiente"}
                  handleClick={handleCreatePending}
                  disabled={creating || !canConfirmOkr(okr)}
                />
              </>
            )}
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

