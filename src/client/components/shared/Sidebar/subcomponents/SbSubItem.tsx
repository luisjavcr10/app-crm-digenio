export const SbSubItem = ({ 
  icon,
  title 
}: Readonly<{ 
  icon: React.ReactElement,
  title: string }>) => {
  return (
    <div className="px-6 py-2.5 flex justify-start items-center gap-4 bg-neutral-4 border-t border-neutral-3">
      {icon}
      {title}
    </div>
  );
};
