import React from 'react';

/**
 * Status types for the tag component
 */
type StatusType = 'draft' | 'pending' | 'in_progress' | 'completed';

/**
 * Props for the TagForStatus component
 */
interface TagForStatusProps {
  status: StatusType;
  label?: string;
}

/**
 * Returns the appropriate color classes based on the status
 * @param status - The current status
 * @returns Object with background color classes for the indicator
 */
const getStatusColors = (status: StatusType) => {
  switch (status) {
    case 'completed':
      return 'bg-alert-green';
    case 'in_progress':
      return 'bg-blue-600';
    case 'pending':
      return 'bg-alert-yellow';
    case 'draft':
    default:
      return 'bg-neutral-2 dark:bg-neutral-4';
  }
};

/**
 * Returns the display label for the status
 * @param status - The current status
 * @returns Formatted status label
 */
const getStatusLabel = (status: StatusType): string => {
  switch (status) {
    case 'in_progress':
      return 'En progreso';
    case 'completed':
      return 'Completado';
    case 'pending':
      return 'Pendiente';
    case 'draft':
      return 'Borrador';
    default:
      return status;
  }
};

/**
 * TagForStatus component - Displays a status indicator with animated dot and label
 * @param status - The current status of the item
 * @param label - Optional custom label to override default status text
 */
export const TagForStatus: React.FC<TagForStatusProps> = ({ status, label }) => {
  const colorClass = getStatusColors(status);
  const displayLabel = label || getStatusLabel(status);

  return (
    <div className="flex items-center gap-2 bg-neutral-4 dark:bg-neutral-2 rounded-[12px] border border-neutral-3 text-[12px] px-2 w-fit">
      <span className="relative flex size-2">
        <span
          className={`absolute inline-flex h-full w-full animate-ping rounded-full ${colorClass} opacity-75`}
        />
        <span
          className={`relative inline-flex size-2 rounded-full ${colorClass}`}
        />
      </span>
      <p className="text-neutral-7 dark:text-neutral-5">{displayLabel}</p>
    </div>
  );
};

export type { TagForStatusProps, StatusType };