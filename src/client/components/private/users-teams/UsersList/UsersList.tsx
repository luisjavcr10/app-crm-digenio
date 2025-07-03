import { useState } from "react";
import { ModalEditUser } from "../ModalEditUser";
import { TeamProps, UserProps } from "@/app/(modules)/users-teams/types";
import { NoData } from "@/client/components/shared/NoData";

export const UsersList = ({
  users,
  teams,
  loading
}:Readonly<{
  users:UserProps[];
  teams:TeamProps[];
  loading:boolean
}>) =>{
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserProps | null>(null);
  const [usersList, setUsersList] = useState<UserProps[]>(users);

  const handleEditUser = (user: UserProps) => {
    setSelectedUser(user);
    setIsModalEditUserOpen(true);
  };

  const handleSaveUser = (updatedUser: UserProps) => {
    setUsersList(prevUsers => 
      prevUsers.map(user => 
        user.id === updatedUser.id ? updatedUser : user
      )
    );
    setIsModalEditUserOpen(false);
    setSelectedUser(null);
  };

  const handleCloseModal = () => {
    setIsModalEditUserOpen(false);
    setSelectedUser(null);
  };

  if(loading){
    return(
      <div className="text-[12px] text-center p-2 gap-0 bg-neutral-4 text-black dark:text-white rounded-[12px] mb-4 font-bold">
          Cargando usuarios...
      </div>
    )
  }

  if(users.length === 0){
    return(
      <NoData />
    )
  }

  return(
    <div className="text-[12px]">
        <div className="px-2 grid grid-cols-10 gap-0 bg-[#FFEAEA] text-black dark:text-white rounded-[12px] mb-4 font-bold">
          <div className="col-span-2 p-2">Nombres y apellidos</div>
          <div className="col-span-2 p-2">Correo electronico</div>
          <div className="col-span-1 p-2">Equipo</div>
          <div className="col-span-1 p-2">Rol</div>
          <div className="col-span-1 p-2">Fecha de registro</div>
          <div className="col-span-1 p-2">Estado</div>
          <div className="col-span-2 p-2">Opciones</div>
        </div>

        {users.map((user) => (
          <div key={user.id}>
            <div className="px-2 grid grid-cols-10 gap-0 border border-neutral-3 text-black dark:text-white rounded-[12px] mb-4">
              <div className="col-span-2 p-2">{user.userId.name}</div>
              <div className="col-span-2 p-2">{user.userId.email}</div>
              <div className="col-span-1 p-2">{user.teams.map((team) => team.name).join(', ')}</div>
              <div className="col-span-1 p-2">{user.position}</div>
             <div className="col-span-1 p-2">
              {new Date(Number(user.hireDate)).toLocaleDateString('es-CL', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })}
            </div>
              <div className="col-span-1 p-2">{user.userId.status}</div>
              <div className="col-span-2 p-2">
                <button 
                  onClick={() => handleEditUser(user)} 
                  className="px-4 cursor-pointer"
                >
                  Editar
                </button>
                <button className="px-4 cursor-pointer">Eliminar</button>
              </div>
            </div>
          </div>
        ))}

        {isModalEditUserOpen && selectedUser && (
          <ModalEditUser 
            user={selectedUser} 
            teams={teams} 
            onClose={handleCloseModal}
            onSave={handleSaveUser}
          />
        )}
    </div>
  )
}