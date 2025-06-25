// ListAddIcon.tsx
interface ListAddIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export const ListAddIcon: React.FC<ListAddIconProps> = ({
  width = 24,
  height = 24,
  fill = "#1F1F1F",
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
        d="M19 15V12H17V15H14V17H17V20H19V17H22V15H21.063H19ZM4 7H15V9H4V7ZM4 11H15V13H4V11ZM4 15H12V17H4V15Z" 
        fill={fill}
      />
    </svg>
  );
};