// ChevronLeft.tsx
interface ChevronProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

const ChevronRight: React.FC<ChevronProps> = ({
  width = 24,
  height = 24,
  stroke = "black",
  strokeWidth = 2,
  className = ""
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
        d="M10 7L15 12L10 17" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ChevronLeft: React.FC<ChevronProps> = ({
  width = 7,
  height = 12,
  stroke = "black",
  strokeWidth = 2,
  className = ""
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
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};

const ChevronTop: React.FC<ChevronProps> = ({
  width = 7,
  height = 12,
  stroke = "black",
  strokeWidth = 2,
  className = ""
}) => {
  return (
    <svg 
      width={width} 
      height={height} 
      viewBox="0 0 12 7" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <path 
        d="M1 6L6 1L11 6" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};


export {
  ChevronRight,
  ChevronLeft,
  ChevronTop
}
