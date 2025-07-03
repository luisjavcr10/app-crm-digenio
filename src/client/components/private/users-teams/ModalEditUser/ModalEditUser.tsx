import { useState } from "react";
import { TextInput } from "../../../shared/formElements";
import { MainButton } from "@/client/components/shared/buttons/MainButton";
import { TeamProps, UserProps } from "@/app/(modules)/users-teams/types";
import { ModalLayout } from "@/client/components/shared/modal";
import { ModalTitle } from "@/client/components/shared/modal";
import { UserForm } from "../UserForm";

export const ModalEditUser = ({
  user,
  teams,
  onClose,
  onSave
}:Readonly<{
  teams:TeamProps[];
  user:UserProps;
  onClose: ()=>void;
  onSave: (user: UserProps) => void;
}>) =>{
  const [userLocal, setUserLocal] = useState<UserProps>(user);

  const handleEdit = () =>{
    // Llamamos a onSave con el usuario modificado
    onSave(userLocal);
  }

  return(
    <ModalLayout onClose={onClose}>
        <ModalTitle text="Editar usuario" onClose={onClose}/>
        <UserForm
          userPassed={userLocal}
          mode="edit"
          handleSave={handleEdit}
        />

        
      </ModalLayout>
  )
}