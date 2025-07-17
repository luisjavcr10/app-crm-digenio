interface EyeOffIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export const EyeOffIcon: React.FC<EyeOffIconProps> = ({
  width = 24,
  height = 24,
  className = "text-neutral-2 dark:text-neutral-4"
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 24 24" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M9.76 12.24C9.76 13.884 11.116 15.24 12.76 15.24C13.444 15.24 14.076 14.988 14.564 14.564L9.76 9.76C9.336 10.248 9.084 10.88 9.084 11.564C9.084 11.788 9.116 12.004 9.172 12.212L9.76 12.24Z" 
        fill="currentColor"
      />
      <path 
        d="M12 5C4.367 5 2.073 11.617 2.052 11.684L1.946 12L2.051 12.316C2.073 12.383 4.367 19 12 19C19.633 19 21.927 12.383 21.948 12.316L22.054 12L21.949 11.684C21.927 11.617 19.633 5 12 5ZM12 17C6.649 17 4.576 13.154 4.074 12C4.578 10.842 6.652 7 12 7C17.351 7 19.424 10.846 19.926 12C19.422 13.158 17.348 17 12 17Z" 
        fill="currentColor"
      />
      <line 
        x1="3" 
        y1="3" 
        x2="21" 
        y2="21" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round"
      />
    </svg>
  );
};