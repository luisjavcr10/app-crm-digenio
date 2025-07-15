import { useMutation } from '@apollo/client';
import { CREATE_OKR_MUTATION, UPDATE_OKR_MUTATION, DELETE_OKR_MUTATION } from '@/client/services/okrs';
import type { OkrProps, OkrStatus } from '@/client/types/okr';

/**
 * Hook personalizado para manejar las operaciones CRUD de OKRs
 */
export const useOkrOperations = () => {
  const [createOkr, { loading: creating, error: createError }] = useMutation(CREATE_OKR_MUTATION);
  const [updateOkr, { loading: updating, error: updateError }] = useMutation(UPDATE_OKR_MUTATION);
  const [deleteOkr, { loading: deleting, error: deleteError }] = useMutation(DELETE_OKR_MUTATION);

  /**
   * Valida si un OKR puede ser confirmado (cambiar de draft a pending)
   */
  const canConfirmOkr = (okr: OkrProps): boolean => {
    return !!okr.name && !!okr.description && !!okr.startDate && !!okr.endDate;
  };

  /**
   * Valida si un OKR puede ser editado
   */
  const canEditOkr = (status: OkrStatus): boolean => {
    return status !== 'completed';
  };

  /**
   * Valida si un OKR puede ser eliminado
   */
  const canDeleteOkr = (status: OkrStatus): boolean => {
    return status === 'draft' || status === 'pending';
  };

  /**
   * Crea un OKR con estado draft
   */
  const createDraftOkr = async (okr: Omit<OkrProps, 'id' | 'userId'>, createdBy: string) => {
    const input = {
      name: okr.name,
      description: okr.description,
      status: 'draft' as const,
      startDate: okr.startDate || undefined,
      endDate: okr.endDate || undefined,
    };

    const { data } = await createOkr({
      variables: { input, createdBy },
    });

    return data?.createOKR;
  };

  /**
   * Crea un OKR con estado pending
   */
  const createPendingOkr = async (okr: Omit<OkrProps, 'id' | 'userId'>, createdBy: string) => {
    if (!canConfirmOkr(okr as OkrProps)) {
      throw new Error('Para crear un OKR pendiente, debe tener nombre, descripción, fecha de inicio y fecha de fin');
    }

    const input = {
      name: okr.name,
      description: okr.description,
      status: 'pending' as const,
      startDate: okr.startDate,
      endDate: okr.endDate,
    };

    const { data } = await createOkr({
      variables: { input, createdBy },
    });

    return data?.createOKR;
  };

  /**
   * Actualiza un OKR existente
   */
  const updateExistingOkr = async (id: string, okr: Partial<OkrProps>) => {
    const input: Partial<OkrProps> = {};
    
    if (okr.name !== undefined) input.name = okr.name;
    if (okr.description !== undefined) input.description = okr.description;
    if (okr.status !== undefined) input.status = okr.status;
    if (okr.startDate !== undefined) input.startDate = okr.startDate;
    if (okr.endDate !== undefined) input.endDate = okr.endDate;

    const { data } = await updateOkr({
      variables: { id, input },
    });

    return data?.updateOKR;
  };

  /**
   * Confirma un OKR draft (lo cambia a pending)
   */
  const confirmDraftOkr = async (okr: OkrProps) => {
    if (!canConfirmOkr(okr)) {
      throw new Error('Para confirmar un OKR, debe tener nombre, descripción, fecha de inicio y fecha de fin');
    }

    return await updateExistingOkr(okr.id, { ...okr, status: 'pending' });
  };

  /**
   * Elimina un OKR
   */
  const deleteExistingOkr = async (id: string) => {
    const { data } = await deleteOkr({ variables: { id } });
    return data?.deleteOKR;
  };

  return {
    // Operaciones
    createDraftOkr,
    createPendingOkr,
    updateExistingOkr,
    confirmDraftOkr,
    deleteExistingOkr,
    
    // Validaciones
    canConfirmOkr,
    canEditOkr,
    canDeleteOkr,
    
    // Estados de carga
    creating,
    updating,
    deleting,
    
    // Errores
    createError,
    updateError,
    deleteError,
  };
};