interface RefreshIconProps {
  width?: number;
  height?: number;
  stroke?: string;
  strokeWidth?: number;
  className?: string;
}

export const RefreshIcon: React.FC<RefreshIconProps> = ({
  width = 24,
  height = 24,
  stroke = "#1F1F1F",
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
        d="M12 13V2L20 6L12 10" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M20.561 10.2219C21.0932 11.862 21.143 13.6205 20.7045 15.2881C20.266 16.9558 19.3577 18.4623 18.0876 19.6286C16.8175 20.7948 15.2392 21.5717 13.5403 21.8667C11.8414 22.1617 10.0935 21.9625 8.50461 21.2928C6.91568 20.623 5.5526 19.5109 4.57753 18.0888C3.60246 16.6666 3.05645 14.9943 3.00446 13.2708C2.95247 11.5473 3.39668 9.8451 4.28425 8.36677C5.17182 6.88844 6.46539 5.6962 8.01105 4.93188" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
      <path 
        d="M8.00202 9.99707C7.50092 10.6641 7.1747 11.4459 7.05306 12.2713C6.93143 13.0966 7.01825 13.9393 7.30562 14.7225C7.59299 15.5057 8.07177 16.2046 8.69835 16.7554C9.32492 17.3063 10.0794 17.6916 10.893 17.8762C11.7065 18.0609 12.5534 18.039 13.3564 17.8127C14.1593 17.5863 14.8929 17.1626 15.4902 16.5802C16.0876 15.9977 16.5297 15.2751 16.7762 14.4781C17.0228 13.6811 17.0661 12.8351 16.902 12.0171" 
        stroke={stroke} 
        strokeWidth={strokeWidth} 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  );
};