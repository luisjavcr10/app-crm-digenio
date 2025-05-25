import { MainButton } from "app/components/shared/buttons/MainButton/MainButton"

export const OkrFormModal = ({
    handleClose,
}:Readonly<{
    handleClose:()=>void,
}>) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      {/* Fondo oscuro */}
      <div 
        className="absolute inset-0 bg-[#1f1f1f80]" 
        onClick={handleClose}
      />
      
      {/* Contenedor del modal */}
      <div className="w-9/12 max-h-11/12 lg:max-h-9/12 overflow-y-auto bg-neutral-5 border border-neutral-3 rounded-[12px] relative z-10">
        <h2 className="w-full py-4 px-6 border-b border-neutral-3 text-[24px] lg:text-[32px] font-[600]">Agregar nuevo OKR</h2>
        
        {/* Contenido del modal irá aquí */}
        <div className="w-full flex flex-col gap-6 py-4 px-6 border-b border-neutral-3">
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Responsable</p>
                <input placeholder="Nombres y apellidos del colaborador" type="text" className="placeholder-neutral-3 border placeholder:text-[12px] outline-neutral-3 border-neutral-3 rounded-[12px] py-2 px-4 flex-1" />
                <input placeholder="Nombre del equipo de trabajo" type="text" className="placeholder-neutral-3 placeholder:text-[12px] border border-neutral-3 outline-neutral-3 rounded-[12px] py-2 px-4 flex-1" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Descripción</p>
                <textarea placeholder="Descripción detallada del objetivo" className="placeholder-neutral-3 placeholder:text-[12px] outline-neutral-3 border border-neutral-3 rounded-[12px] py-2 px-4 flex-1" />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Fecha inicio</p>
                <input type="date" className="outline-neutral-3 border border-neutral-3 rounded-[12px] py-2 px-4 " />
            </div>
            <div className="flex flex-col lg:flex-row gap-4 lg:gap-8">
                <p className="min-w-[100px]">Fecha fin</p>
                <input type="date" className="outline-neutral-3 border border-neutral-3 rounded-[12px] py-2 px-4 " />
            </div>
        </div>

        <div className="w-full py-4 px-6 flex justify-center items-center">
            <MainButton text="Agregar nuevo OKR" handleClick={()=>{}} />
        </div>
       
      </div>
    </div>
  )
}