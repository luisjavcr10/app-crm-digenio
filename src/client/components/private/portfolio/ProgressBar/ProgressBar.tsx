export const ProgressBar = ({ percentage = 0 }) => {
  const getColor = () => {
    if (percentage === 0) return 'bg-alert-yellow';
    if (percentage === 100) return 'bg-blue-600';
    return 'bg-alert-green';
  };

  return (
    <div className="w-full h-3 border border-neutral-3 rounded-full overflow-hidden">
      <div
        className={`h-full ${getColor()} transition-all duration-300 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};
