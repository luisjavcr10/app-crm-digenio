export const ProgressBar = ({ percentage = 0, color = 'bg-alert-green' }) => {
  return (
    <div className="w-full h-3 border border-neutral-3 rounded-full overflow-hidden">
      <div
        className={`h-full ${color} transition-all duration-300 rounded-full`}
        style={{ width: `${percentage}%` }}
      ></div>
    </div>
  );
};