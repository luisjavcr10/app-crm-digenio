// ChevronLeft.tsx
interface ChevronProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const ChevronLeft: React.FC<ChevronProps> = ({
  width = 7,
  height = 12,
  strokeWidth = 2,
  className = "text-neutral-2 dark:text-neutral-4"
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 7 12" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M6 11L1 6L6 1" 
        stroke="currentColor" 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};



export {
  ChevronLeft,
}
