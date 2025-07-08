import { TeamProps } from "@/app/(modules)/users-teams/types";
import { ModalLayout, ModalTitle } from "@/client/components/shared/modal";
import { TeamForm } from "../TeamForm";

export const ModalEditTeam = ({
  team,
  onClose,
  onSave
}:Readonly<{
  team: TeamProps;
  onClose: () => void;
  onSave: () => void;
}>) => {

  return(
    <ModalLayout onClose={onClose}>
        <ModalTitle text="Editar equipo" onClose={onClose} />

        <TeamForm teamPassed={team} mode="edit" handleSave={onSave} />
    </ModalLayout>

  )
}