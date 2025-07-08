import { TeamProps } from "@/app/(modules)/users-teams/types";
import { ModalLayout, ModalTitle } from "@/client/components/shared/modal";
import { TeamForm } from "../TeamForm";

export const ModalShowTeam = ({
  team,
  onClose
}:Readonly<{
  team: TeamProps;
  onClose: () => void;
}>) =>{
   return(
    <ModalLayout onClose={onClose}>
        <ModalTitle text="Detalles del equipo" onClose={onClose} />

        <TeamForm teamPassed={team} mode="view" handleSave={()=>{}} />
    </ModalLayout>

  )
}