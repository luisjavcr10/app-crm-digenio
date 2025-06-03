interface OkrTextareaInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

export const OkrTextareaInput = ({
  label,
  value,
  onChange,
  placeholder = "",
  className = "",
  disabled
}: OkrTextareaInputProps) => {
  return (
    <div className={`flex flex-col lg:flex-row gap-4 lg:gap-8 ${className}`}>
      <p className="min-w-[100px]">{label}</p>
      <textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className="caret-neutral-3 placeholder-neutral-3 placeholder:text-[12px] outline-neutral-3 dark:outline-neutral-2 border border-neutral-3 dark:border-neutral-2 rounded-[12px] py-2 px-4 flex-1"
      />
    </div>
  );
};