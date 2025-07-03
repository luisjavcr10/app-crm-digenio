import { CloseIcon } from "../../icons/CloseIcon";

export const ModalTitle = ({
  text,
  onClose
}: Readonly<{
  text: string;
  onClose: () => void;
}>) => {
  return (
    <div className="flex justify-between items-center px-6 py-4 border-b border-neutral-3 dark:border-neutral-2">
      <h2 className="text-[24px] lg:text-[32px] font-[600]">{text}</h2>
      <CloseIcon onClick={onClose} />
    </div>
  );
};
