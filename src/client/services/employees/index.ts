import { gql } from "@apollo/client";

export const EMPLOYEES = gql`
  query Employees {
    employees {
      id
      teams {
        name
      }
      position
      department
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
      }
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