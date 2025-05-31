import { useState } from "react";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { OkrTextInput } from "../OkrTextInput";
import { OkrTextareaInput } from "../OkrTextareaInput";
import { OkrDateInput } from "../OkrDateInput";

interface okrProps {
  nombresResponsable: string;
  nombreEquipo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
}


export const OkrFormModal = ({
    handleClose,
    handleSubmit,
}:Readonly<{
    handleClose:()=>void,
    handleSubmit:(okr:okrProps)=>void,
}>) => {
  const [okr, setOkr] = useState<okrProps>({
    nombresResponsable: "",
    nombreEquipo: "",
    descripcion: "",
    fechaInicio: "",
    fechaFin: "",
  });

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-[#1f1f1f80]" 
        onClick={handleClose}
      />
      
      {/* Contenedor del modal */}
      <div className="w-9/12 max-h-11/12 lg:max-h-9/12 overflow-y-auto bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[12px] relative z-10">
        <h2 className="w-full py-4 px-6 border-b border-neutral-3 dark:border-neutral-2  text-[24px] lg:text-[32px] font-[600]">Agregar nuevo OKR</h2>
        
        {/* Contenido del modal irá aquí */}
        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3 dark:border-neutral-2 ">
          <div className={`flex flex-col lg:flex-row gap-4 lg:gap-8 `}>
            <p className="min-w-[100px]">Responsable</p>
              <OkrTextInput
                label="Responsable"
                value={okr.nombresResponsable}
                onChange={value => setOkr({ ...okr, nombresResponsable: value })}
                placeholder="Nombres y apellidos del colaborador"
              />
              <OkrTextInput
                label="Equipo"
                value={okr.nombreEquipo}
                onChange={value => setOkr({ ...okr, nombreEquipo: value })}
                placeholder="Nombre del equipo de trabajo"
              />
           </div>
            <OkrTextareaInput
              label="Descripción"
              value={okr.descripcion}
              onChange={value => setOkr({ ...okr, descripcion: value })}
              placeholder="Descripción detallada del objetivo"
            />
            <OkrDateInput
              label="Fecha inicio"
              value={okr.fechaInicio}
              onChange={value => setOkr({ ...okr, fechaInicio: value })}
            />
            <OkrDateInput
              label="Fecha fin"
              value={okr.fechaFin}
              onChange={value => setOkr({ ...okr, fechaFin: value })}
            />
        </div>

        <div className="w-full py-4 px-6 flex justify-center items-center">
            <MainButton text="Agregar nuevo OKR" handleClick={()=>{handleSubmit(okr); handleClose()}} />
        </div>
       
      </div>
    </div>
  )
}