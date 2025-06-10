import React from "react";

export const ModalLayout = ({
  children,
  onClose
}: Readonly<{ children: React.ReactNode, onClose: () => void }>) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute inset-0 bg-[#1f1f1f80]" onClick={onClose} />
      <div className="w-9/12 max-h-11/12 lg:max-h-11/12 overflow-y-auto bg-neutral-5 dark:bg-neutral-1 border border-neutral-3 dark:border-neutral-2 rounded-[12px] relative z-10">
        {children}
      </div>
    </div>
  );
};
