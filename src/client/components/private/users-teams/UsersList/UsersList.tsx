import { useState } from "react";
import { ModalEditUser } from "../ModalEditUser";

interface UserProps {
  id:string;
  position: string;
  department: string;
  skills: string[];
  hireDate:string;
  userId:{
    name:string;
    email:string;
    status:string;
  };
  teams:{
    id:string;
    name:string
  }[];
  contactInfo:{
    phone:string;
    emergencyContact:string;
  }
}
interface TeamProps {
  id:string;
  name:string;
  description:string;
  status:string;
  manager:{
    userId:{
      name:string
    }
  };
  members :{
    userId:{
      name:string
    }
  }[];
}

export const UsersList = ({
  users,
  teams
}:Readonly<{
  users:UserProps[];
  teams:TeamProps[]
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

        {usersList.map((user) => (
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