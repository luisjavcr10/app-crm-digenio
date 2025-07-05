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
        userId {
          name
        }
      }
      manager {
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
