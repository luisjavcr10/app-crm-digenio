import { ModalLayout } from "@/client/components/shared/modal";
import { ModalTitle } from "@/client/components/shared/modal";
import { UserForm } from "../UserForm";
import { UserProps } from "@/app/(modules)/users-teams/types";

export const ModalShowUser = ({  
  user,
  onClose,
}:Readonly<{
  user:UserProps;
  onClose: ()=>void;
}>) =>{

  return(
    <ModalLayout onClose={onClose}>
      <ModalTitle text="Ver usuario" onClose={onClose}/>
      <UserForm
          userPassed={user}
          mode="view"
          handleSave={()=>{}}
        />  
    </ModalLayout>
  )
}