/**
 * OKR (Objectives and Key Results) type definitions
 */

/**
 * Status types for OKR
 */
export type OkrStatus = 'draft' | 'pending' | 'in_progress' | 'completed';

/**
 * OKR data structure
 */
export type OkrProps = {
  id: string;
  name: string;
  description: string;
  status: OkrStatus;
  startDate: string;
  endDate: string;
  userId: string;
};

/**
 * OKR form data structure (for creation/editing)
 */
export type OkrFormData = Omit<OkrProps, 'id' | 'userId'>;

/**
 * OKR filter options
 */
export type OkrFilterStatus = OkrStatus | 'all';