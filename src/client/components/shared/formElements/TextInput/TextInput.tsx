import React from "react";

interface TextInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const TextInput = ({
  value,
  onChange,
  placeholder = "",
  disabled,
}: TextInputProps) => {
  return (
      <input
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        type="text"
        disabled={disabled}
        className="caret-neutral-3 placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border-neutral-3 dark:border-neutral-2 rounded-[6px] py-1 px-4 flex-1"
      />
  );
};