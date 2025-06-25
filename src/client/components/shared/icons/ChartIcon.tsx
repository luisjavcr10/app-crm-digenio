interface ChartIconProps {
  width?: number;
  height?: number;
  fill?: string;
  className?: string;
}

export const ChartIcon: React.FC<ChartIconProps> = ({
  width = 24,
  height = 24,
  fill = "#1F1F1F",
  className = "",
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
        d="M3 5V19C3 20.103 3.897 21 5 21H19C20.103 21 21 20.103 21 19V5C21 3.897 20.103 3 19 3H5C3.897 3 3 3.897 3 5ZM19.001 19H5V5H19L19.001 19Z"
        fill={fill}
      />
      <path
        d="M11 7H13V17H11V7ZM15 10H17V17H15V10ZM7 12H9V17H7V12Z"
        fill={fill}
      />
    </svg>
  );
};
