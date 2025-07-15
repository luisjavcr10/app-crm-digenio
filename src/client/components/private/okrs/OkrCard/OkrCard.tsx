import { OkrFormModal } from "../OkrFormModal";
import { useState } from "react";
import { getFormattedDate } from "@/client/utils/formatDate";

interface okrProps {
  id: string;
  name: string;
  description: string;
  status: string;
  startDate: string;
  endDate: string;
  userId: string;
}

export const OkrCard = ({
  index,
  okr,
}: Readonly<{
  index: number;
  okr: okrProps;
}>) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div key={index} className="">
      {isModalOpen && (
        <OkrFormModal
          handleClose={handleCloseModal}
          handleSubmit={() => {}}
          okr={okr}
        />
      )}

      <div
        onClick={handleOpenModal}
        className="py-3 px-5 flex items-end justify-between gap-2 border-y border-x border-neutral-3 dark:border-neutral-2 rounded-t-[12px] cursor-pointer hover:scale-[1.02] hover:rounded-b-[12px] hover:bg-neutral-4 origin-bottom transition-all duration-200 ease-out"
      >
        <div className="flex flex-col gap-2">
          <p className="text-[16px]">{okr.name}</p>
          <div className="flex items-center gap-2 bg-neutral-4 dark:bg-neutral-2 rounded-[12px] border border-neutral-3 text-[12px] px-2 w-fit">
            <span className="relative flex size-2">
              <span
                className={`absolute inline-flex h-full w-full animate-ping rounded-full ${
                  okr.status === "completed"
                    ? "bg-alert-green"
                    : okr.status === "in_progress"
                    ? "bg-blue-600"
                    : okr.status === "pending"
                    ? "bg-alert-yellow"
                    : "bg-neutral-2"
                } opacity-75`}
              ></span>
              <span
                className={`relative inline-flex size-2 rounded-full ${
                  okr.status === "completed"
                    ? "bg-alert-green"
                    : okr.status === "in_progress"
                    ? "bg-blue-600"
                    : okr.status === "pending"
                    ? "bg-alert-yellow"
                    : "bg-neutral-2"
                }`}
              ></span>
            </span>

            <p>{okr.status}</p>
          </div>
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
