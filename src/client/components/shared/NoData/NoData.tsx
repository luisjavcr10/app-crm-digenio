import { DataServer } from "../icons/DataServer";

export const NoData = () => {
  return (
    <div className="min-h-[450px] flex flex-col justify-center items-center gap-4 border border-neutral-3 rounded-[24px]">
      <DataServer />
      <p>No data to show</p>
    </div>
  );
};
