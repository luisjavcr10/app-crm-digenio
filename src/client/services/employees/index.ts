import { gql } from "@apollo/client";

export const EMPLOYEES = gql`
  query Employees {
    employees {
      id
      teams {
        id
        name
      }
      position
      skills
      contactInfo {
        emergencyContact
        phone
      }
      hireDate
      userId {
        name
        email
        status
        roles
      }
    }
  }
`;

export const ID_NAME_EMPLOYEES = gql`
  query Employees {
    employees {
      id
      userId {
        name
      }
    }
  }
`;

export const ID_NAME_TEAMS = gql`
  query Teams {
    teams {
      id
      name
    }
  }
`;

export const TEAMS = gql`
  query Teams{
    teams {
      id
      name
      description
      status
      members {
        id
        userId {
          name
        }
      }
      manager {
        id
        userId {
          name
        }
      }
    }
  }
`;

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($userData: UserInput!, $employeeData: EmployeeInput!) {
    createEmployee(userData: $userData, employeeData: $employeeData) {
    userId {
      email
      name
    }
  }
  }
`;

export const CREATE_TEAM = gql`
  mutation CreateTeam($input: CreateTeamInput!) {
    createTeam(input: $input) {
      id
      name
      manager {
        userId {
          name
        }
      }
    }
  }
`;

export const SOFTDELETE_EMPLOYEE = gql`
  mutation SoftDeleteEmployee($softDeleteEmployeeId: ID!) {
    softDeleteEmployee(id: $softDeleteEmployeeId) 
  }
`

export const SOFTDELETE_TEAM = gql`
  mutation SoftDeleteTeam($softDeleteTeamId: ID!) {
    softDeleteTeam(id: $softDeleteTeamId)
  }
`;
