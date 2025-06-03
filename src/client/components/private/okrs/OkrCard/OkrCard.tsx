import { ProfileIcon } from "@/client/components/shared/icons/ProfileIcon";

interface okrProps {
  nombresResponsable: string;
  nombreEquipo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
  titulo: string;
  estado: string;
}

export const OkrCard = ({
  index,
  okr,
}: Readonly<{
  index: number;
  okr: okrProps;
}>) => {
  return (
    <div
      key={index}
      className=""
    >
      <div className="py-3 px-5 flex items-end justify-between border-y border-x border-neutral-3 dark:border-neutral-2 rounded-t-[12px] cursor-pointer hover:scale-[1.02] hover:rounded-b-[12px] hover:bg-neutral-4 origin-bottom transition-all duration-200 ease-out">
        <div>
          <p className="text-[24px]">{okr.titulo}</p>
          <div className="flex items-center gap-2 bg-neutral-4 dark:bg-neutral-2 rounded-[12px] border border-neutral-3 text-[12px] px-2 w-fit">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-alert-green opacity-75"></span>
              <span className="relative inline-flex size-2 rounded-full bg-alert-green"></span>
            </span>
            <p>{okr.estado}</p>
          </div>
        </div>

        <div className="flex flex-col ">
          <p className="text-[12px]">{okr.fechaInicio}</p>
          <p className="text-[12px]">{okr.fechaFin}</p>
        </div>
      </div>

      <p className="border-b border-x border-neutral-3 dark:border-neutral-2  rounded-b-[12px] py-3 px-5 text-[12px]">{okr.descripcion}</p>
    </div>
  );
};
