import { ChevronLeft } from "../../icons/sidebarToggles";
import { EyeIcon, ListAddIcon } from "../../icons";
import { SbSubItem } from "../SbSubItem";

export const SbItem = ({
  title,
  isOpen,
  subItems,
  handleOpen,
  icon,
}: Readonly<{
  title: string;
  isOpen: boolean;
  subItems: {
    title: string;
  }[];
  handleOpen: () => void;
  icon: React.ReactElement
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

      {isOpen &&
        subItems.map((subItem, index) => (
          <SbSubItem 
            key={index}
            icon={index===1? <ListAddIcon /> : <EyeIcon />}
            title={subItem.title}
          />
        ))}
    </>
  );
};
