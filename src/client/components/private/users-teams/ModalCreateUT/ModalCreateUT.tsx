import { useState } from "react";
import { SwitchEntity } from "../SwitchEntity";
import { ModalTitle, ModalLayout } from "@/client/components/shared/modal";
import { UserForm } from "../UserForm";
import { TeamForm } from "../TeamForm";

export const ModalCreateUT = ({
  handleClose,
  handleSave,
}: Readonly<{
  handleClose: () => void;
  handleSave: () => void;
}>) => {
  const [entity, setEntity] = useState<"users" | "teams">("users");

  return (
    <ModalLayout onClose={handleClose}>
      <ModalTitle text="Agregar nuevo usuario / equipo" />

      <SwitchEntity
        entity={entity}
        click1={() => setEntity("users")}
        click2={() => setEntity("teams")}
        isModal={true}
      />

      {entity === "users" ? (
        <UserForm handleSave={handleSave} />
      ) : (
        <TeamForm handleSave={handleSave} />
      )}

    </ModalLayout>
  );
};
