import React from "react";
import { getFormattedDate } from "@/client/utils/formatDate";

interface DateInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export const DateInput = ({
  label,
  value,
  onChange,
  className = "",
  disabled
}: DateInputProps) => {
  const formattedValue = getFormattedDate(value);

  return (
    <div className={`text-[12px] scheme-light dark:scheme-dark flex flex-col lg:flex-row gap-4 lg:gap-8 ${className}`}>
      <p className="min-w-[100px]">{label}</p>
      <input
        value={formattedValue}
        onChange={e => onChange(e.target.value)}
        type="date"
        disabled={disabled}
        placeholder="dd/mm/aa"
        className="caret-neutral-3 outline-neutral-3 dark:outline-neutral-2 border border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4"
      />
    </div>
  );
};