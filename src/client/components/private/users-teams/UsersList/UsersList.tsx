

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
    name:string
  }[];
  contactInfo:{
    phone:string;
    emergencyContact:string;
  }
}

export const UsersList = ({
  users
}:Readonly<{
  users:UserProps[];
}>) =>{
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

        {users.map((user, idx) => (
          <div className="px-2 grid grid-cols-10 gap-0 border border-neutral-3 text-black dark:text-white rounded-[12px] mb-4" key={idx}>
            <div className="col-span-2 p-2">{user.userId.name}</div>
            <div className="col-span-2 p-2">{user.userId.email}</div>
            <div className="col-span-1 p-2">{user.teams.map((team) => team.name).join(', ')}</div>
            <div className="col-span-1 p-2">{user.position}</div>
            <div className="col-span-1 p-2">{user.hireDate}</div>
            <div className="col-span-1 p-2">{user.userId.status}</div>
            <div className="col-span-2 p-2">
              <button className="px-4 cursor-pointer">Editar</button>
              <button className="px-4 cursor-pointer">Eliminar</button>
            </div>
            
          </div>
        ))}  
      </div>
  )
}