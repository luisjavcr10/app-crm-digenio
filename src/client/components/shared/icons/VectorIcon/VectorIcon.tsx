interface CustomSvgIconProps {
  className?: string;
}

const VectorIcon: React.FC<CustomSvgIconProps> = ({ className = "" }) => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 32 32"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={`text-[#1F1F1F] dark:text-white ${className}`}
  >
    <path
      d="M12.6666 2.6665H5.99996C5.1159 2.6665 4.26806 3.01769 3.64294 3.64281C3.01782 4.26794 2.66663 5.11578 2.66663 5.99984V25.9998C2.66663 26.8839 3.01782 27.7317 3.64294 28.3569C4.26806 28.982 5.1159 29.3332 5.99996 29.3332H26C26.884 29.3332 27.7319 28.982 28.357 28.3569C28.9821 27.7317 29.3333 26.8839 29.3333 25.9998V19.3332M16 15.9998L29.3333 2.6665M29.3333 2.6665V10.9998M29.3333 2.6665H21"
      stroke="currentColor"
      strokeWidth="4"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default VectorIcon;
