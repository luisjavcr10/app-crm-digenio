export interface UserProps {
  id:string;
  position: string;
  skills: string[];
  hireDate:string;
  userId:{
    name:string;
    email:string;
    roles:("ADMIN" | "TEAMLEADER" | "EMPLOYEE" )[];
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

export interface TeamProps {
  id:string;
  name:string;
  description:string;
  status:string;
  manager:{
    id:string;
    userId:{
      name:string
    }
  };
  members :{
    id:string;
    userId:{
      name:string
    }
  }[];
}

export interface EmployeeLigthProps{
  id:string,
  userId:{
    name:string
  }
}

export interface TeamLigthProps{
  id:string,
  name:string
}