import React from 'react';
import type { OkrProps } from '@/client/types/okr';

interface OkrValidationMessageProps {
  okr: OkrProps;
  showForPending?: boolean;
}

/**
 * Componente que muestra mensajes de validación para OKRs
 */
export const OkrValidationMessage: React.FC<OkrValidationMessageProps> = ({ 
  okr, 
  showForPending = false 
}) => {
  const missingFields: string[] = [];

  if (!okr.name.trim()) missingFields.push('Nombre');
  if (!okr.description.trim()) missingFields.push('Descripción');
  if (showForPending) {
    if (!okr.startDate) missingFields.push('Fecha de inicio');
    if (!okr.endDate) missingFields.push('Fecha de fin');
  }

  if (missingFields.length === 0) return null;

  return (
    <div className="bg-neutral-4 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-lg p-4 mb-4 text-[12px]">
      <div className="flex items-start">
        <div className="flex-shrink-0 py-1">
          <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="flex gap-2">
          <h3 className="px-4 py-1 font-medium text-neutral-1 dark:text-neutral-5">
            {showForPending ? 'Campos requeridos para crear un OKR:' : 'Campos faltantes:'}
          </h3>
          <div className="flex gap-2 text-neutral-1 dark:text-neutral-5">
              {missingFields.map((field) => (
                <p key={field} className='px-4 py-1 bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[8px]'>{field}</p>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};