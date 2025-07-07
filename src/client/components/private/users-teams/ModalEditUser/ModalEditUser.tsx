import { UserProps } from "@/app/(modules)/users-teams/types";
import { ModalLayout } from "@/client/components/shared/modal";
import { ModalTitle } from "@/client/components/shared/modal";
import { UserForm } from "../UserForm";

export const ModalEditUser = ({
  user,
  onClose,
  onSave
}:Readonly<{
  user:UserProps;
  onClose: ()=>void;
  onSave: (user: UserProps) => void;
}>) =>{

  const handleEdit = () =>{
    // Llamamos a onSave con el usuario modificado
    onSave(user);
  }

  return(
    <ModalLayout onClose={onClose}>
        <ModalTitle text="Editar usuario" onClose={onClose}/>
        <UserForm
          userPassed={user}
          mode="edit"
          handleSave={handleEdit}
        />    
    </ModalLayout>
  )
}