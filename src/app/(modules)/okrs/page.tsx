export default function OkrsPage() {
  return (
    <div className="min-h-screen my-6 mx-8 flex flex-col gap-8">
      <div className="flex flex-col lg:flex-row justify-between items-start gap-8">
        <div className="w-full">
          <p className="text-[36px] font-[600] mb-2">OKRs</p>
          <p>
            Gestión de objetivos para alinear y dar seguimiento a las metas de
            la empresa.
          </p>
        </div>
        <div className="w-full flex justify-center lg:justify-end">
        <button className="py-2 px-10 bg-primary-1 hover:bg-alert-red text-neutral-5 rounded-[12px] cursor-pointer">
          Agregar nuevo OKR
        </button>
        </div>
        
      </div>

      <div className="min-h-[550px] flex justify-center items-center border border-neutral-3 rounded-[24px]">
            No data to show
      </div>
    </div>
  );
}
