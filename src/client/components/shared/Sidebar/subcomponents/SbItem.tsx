import { ChevronLeft } from "../../icons/sidebarToggles";

export const SbItem = ({
  title,
  isOpen,
  handleOpen,
  icon,
  children
}: Readonly<{
  title: string;
  isOpen: boolean;
  handleOpen: () => void;
  icon: React.ReactElement;
  children?: React.ReactNode;
}>) => {
  return (
    <>
      <div
        onClick={handleOpen}
        className="px-6 py-2.5 flex justify-between items-center border-t border-neutral-3"
      >
        <div className="flex gap-4">
          {icon}
          <p>{title}</p>
        </div>
        
        <ChevronLeft className={`${isOpen ? "duration-500 rotate-90" : "duration-500 rotate-270"}`} />
      </div>

        {children}
    </>
  );
};
