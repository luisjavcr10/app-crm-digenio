import { OkrFormModal } from "../OkrFormModal";
import { useState } from "react";
import { getFormattedDate } from "@/client/utils/formatDate";
import { TagForStatus } from "@/client/components/shared/TagForStatus";
import type { OkrProps } from "@/client/types/okr";

export const OkrCard = ({
  index,
  okr,
  onUpdate,
  onDelete,
}: Readonly<{
  index: number;
  okr: OkrProps;
  onUpdate?: (okr: OkrProps) => void;
  onDelete?: (okrId: string) => Promise<void>;
}>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = (updatedOkr: OkrProps) => {
    onUpdate?.(updatedOkr);
    setIsModalOpen(false);
  };


  return (
    <div key={index} className="">
      {isModalOpen && (
        <OkrFormModal
          handleClose={handleCloseModal}
          handleSubmit={handleSubmit}
          okr={okr}
          onDelete={onDelete}
        />
      )}

      <div
        onClick={handleOpenModal}
        className="py-3 px-5 flex items-end justify-between gap-2 border-y border-x border-neutral-3 dark:border-neutral-2 rounded-t-[12px] cursor-pointer hover:scale-[1.02] hover:rounded-b-[12px] hover:bg-neutral-4 origin-bottom transition-all duration-200 ease-out"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[16px]">{okr.name}</p>
          <TagForStatus status={okr.status} />
        </div>

        <div className="flex flex-col ">
          <p className="text-[10px]">{getFormattedDate(okr.startDate)}</p>
          <p className="text-[10px]">{getFormattedDate(okr.endDate)}</p>
        </div>
      </div>

      <p className="border-b border-x border-neutral-3 dark:border-neutral-2  rounded-b-[12px] py-3 px-5 text-[12px]">
        {!okr.description ? "Aún no se define la descripción del objetivo. Se mantendrá como borrador." : okr.description}
      </p>
    </div>
  );
};
