import { useState } from "react";
import { SwitchEntity } from "../SwitchEntity";
import { ModalTitle, ModalLayout } from "@/client/components/shared/modal";
import { UserForm } from "../usersComponents/UserForm";
import { TeamForm } from "../teamsComponents/TeamForm";

export const ModalCreateUT = ({
  mode,
  handleClose,
  handleSave,
}: Readonly<{
  mode: "create" | "edit" | "view";
  handleClose: () => void;
  handleSave: () => void;
}>) => {
  const [entity, setEntity] = useState<"users" | "teams">("users");

  return (
    <ModalLayout onClose={handleClose}>
      <ModalTitle onClose={handleClose} text="Agregar nuevo usuario / equipo" />

      <SwitchEntity
        entity={entity}
        click1={() => setEntity("users")}
        click2={() => setEntity("teams")}
        isModal={true}
      />

      {entity === "users" ? (
        <UserForm mode={mode} handleSave={handleSave} />
      ) : (
        <TeamForm mode={mode} handleSave={handleSave} />
      )}

    </ModalLayout>
  );
};
