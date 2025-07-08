// DocumentIcon.tsx
interface DocumentIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export const DocumentIcon: React.FC<DocumentIconProps> = ({
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
        d="M19.903 8.586C19.8555 8.4775 19.7892 8.37829 19.707 8.293L13.707 2.293C13.6217 2.21083 13.5225 2.14447 13.414 2.097C13.384 2.083 13.352 2.075 13.32 2.064C13.2363 2.03563 13.1492 2.01848 13.061 2.013C13.04 2.011 13.021 2 13 2H6C4.897 2 4 2.897 4 4V20C4 21.103 4.897 22 6 22H18C19.103 22 20 21.103 20 20V9C20 8.979 19.989 8.96 19.987 8.938C19.9815 8.84979 19.9644 8.7627 19.936 8.679C19.9267 8.647 19.9157 8.616 19.903 8.586ZM16.586 8H14V5.414L16.586 8ZM6 20V4H12V9C12 9.26522 12.1054 9.51957 12.2929 9.70711C12.4804 9.89464 12.7348 10 13 10H18L18.002 20H6Z" 
        fill="currentColor"
      />
      <path 
        d="M8 12H16V14H8V12ZM8 16H16V18H8V16ZM8 8H10V10H8V8Z" 
        fill="currentColor"
      />
    </svg>
  );
};