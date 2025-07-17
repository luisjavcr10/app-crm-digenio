import { MainButton } from "@/client/components/shared/buttons/MainButton";

/**
 * Modal de éxito reutilizable para mostrar mensajes de confirmación
 * @param isOpen - Estado de visibilidad del modal
 * @param message - Mensaje a mostrar en el modal
 * @param buttonText - Texto del botón (por defecto "Ir a login")
 * @param onClose - Función que se ejecuta al cerrar el modal
 */
export const SuccessModal = ({
  isOpen,
  message,
  buttonText = "Ir a login",
  onClose
}: Readonly<{
  isOpen: boolean;
  message: string;
  buttonText?: string;
  onClose: () => void;
}>) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-[#1f1f1f80] flex items-center justify-center z-50">
      <div className="bg-neutral-4 dark:bg-neutral-2 p-6 rounded-lg shadow-lg max-w-sm w-full flex flex-col items-center">
        <h2 className="text-[16px] text-center mb-4">
          {message}
        </h2>
        <MainButton
          text={buttonText}
          handleClick={onClose}
          disabled={false}
        />
      </div>
    </div>
  );
};