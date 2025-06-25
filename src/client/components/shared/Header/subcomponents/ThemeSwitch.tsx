import { useTheme } from "@/client/hooks/useTheme";
import { MdOutlineLightMode, MdOutlineDarkMode } from "react-icons/md";
import { FaLaptop } from "react-icons/fa6";

export const ThemeSwitch = () => {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex gap-1 border border-neutral-3 rounded-[16px]">
      <button 
        onClick={()=>setTheme('system')}
        className={`p-0.5 ${theme==='system'? 'border-r border-y border-neutral-3 rounded-full':''}`}>
        <FaLaptop className="w-[10px] h-[10px]" />
      </button>
      <button 
        onClick={()=>setTheme('light')}
        className={`p-0.5 ${theme==='light'?'border border-neutral-3 rounded-full':''}`}>
        <MdOutlineLightMode className="w-[10px] h-[10px]" />
      </button>
      <button 
        onClick={()=>setTheme('dark')}
        className={`p-0.5 ${theme==='dark'? 'border-l border-y border-neutral-3 rounded-full':''}`}>
        <MdOutlineDarkMode className="w-[10px] h-[10px]" />
      </button>
    </div>
  );
};
