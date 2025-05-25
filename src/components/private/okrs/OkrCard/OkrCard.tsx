import { ProfileIcon } from "app/components/shared/icons/ProfileIcon";

interface okrProps {
  nombresResponsable: string;
  nombreEquipo: string;
  descripcion: string;
  fechaInicio: string;
  fechaFin: string;
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
      className="border border-neutral-3 dark:border-neutral-2 rounded-[12px]"
    >
      <div className="py-3 px-5 flex justify-between border-b border-neutral-3 dark:border-neutral-2">
        <div className="flex gap-4">
          <ProfileIcon />
          <div className="flex flex-col">
            <p >{okr.nombresResponsable}</p>
            <p className="text-[12px]">{okr.nombreEquipo}</p>
          </div>
          
        </div>
        <div className="flex flex-col">
          <p className="text-[12px]">{okr.fechaInicio}</p>
          <p className="text-[12px]">{okr.fechaFin}</p>
        </div>
      </div>

      <p className="py-3 px-5 text-[12px]">{okr.descripcion}</p>
    </div>
  );
};
