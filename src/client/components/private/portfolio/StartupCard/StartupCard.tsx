import { ProgressBar } from "../ProgressBar";

interface startupProps {
  client: string;
  title: string;
  description: string;
  responsible: string;
  monthlyMetric: string;
}

export const StartupCard = ({st}:Readonly<{st:startupProps}>) => {
  return (
    <div>
      <div className="py-3 px-5 flex items-end justify-between border-y border-x border-neutral-3 dark:border-neutral-2 rounded-t-[12px] cursor-pointer hover:scale-[1.02] hover:rounded-b-[12px] hover:bg-neutral-4 origin-bottom transition-all duration-200 ease-out">
        <p className="text-[16px]">{st.title}</p>
      </div>
      <div className="flex flex-col gap-3 px-5 py-2 border-x border-b border-neutral-3">
        <div className="flex items-center gap-2 bg-neutral-4 dark:bg-neutral-2 rounded-[12px] border border-neutral-3 text-[12px] px-2 w-fit">
          <span className="relative flex size-2">
            <span
              className={`absolute inline-flex h-full w-full animate-ping rounded-full 
                          bg-alert-green opacity-75`}
            ></span>
            <span
              className={`relative inline-flex size-2 rounded-full bg-alert-green`}
            ></span>
          </span>

          <p className="text-[12px]">Crecimiento</p>
        </div>

        <ProgressBar percentage={50} />
      </div>

      <p className="border-b border-x border-neutral-3 dark:border-neutral-2  rounded-b-[12px] py-3 px-5 text-[12px]">
        {st.monthlyMetric}
      </p>
    </div>
  );
};
