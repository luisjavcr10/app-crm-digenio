import { DataServer } from "../icons/DataServer";

export const NoData = () => {
  return (
    <div className="flex-1 w-full flex flex-col justify-center items-center gap-4 border border-neutral-3 rounded-[24px]">
      <DataServer />
      <p>No data to show</p>
    </div>
  );
};
