interface TextareaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const TextareaInput = ({
  value,
  onChange,
  placeholder = "",
  disabled
}: TextareaInputProps) => {
  return (
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="min-h-20 caret-neutral-3 placeholder-neutral-3 placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
      />
  );
};