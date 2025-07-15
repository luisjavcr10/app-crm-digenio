import { gql } from "@apollo/client";

export const GET_STARTUP_QUERY = gql`
  query GetStartup($id: ID!) {
    getStartup(id: $id) {
      _id
      name
      description
      okrId {
        id
        name
      }
      teamId {
        id
        name
      }
      status
      observation
      sprints {
        orderNumber
        name
        deliverable
        startDate
        endDate
        status
        modules {
          name
          task
          responsible {
            id
            userId {
              email
              name
            }
          }
          status
          deadline
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_STARTUPS_QUERY = gql`
  query GetAllStartups {
    getAllStartups {
      _id
      name
      description
      okrId {
        id
        name
      }
      teamId {
        id
        name
      }
      status
      observation
      sprints {
        orderNumber
        name
        deliverable
        startDate
        endDate
        status
        modules {
          name
          task
          responsible {
            id
            userId {
              email
              name
            }
          }
          status
          deadline
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const GET_STARTUPS_BY_OKR_QUERY = gql`
  query GetStartupsByOkr($okrId: ID!) {
    getStartupsByOkr(okrId: $okrId) {
      _id
      name
      description
      status
      observation
      sprints {
        orderNumber
        name
        status
      }
      createdAt
    }
  }
`;

export const GET_STARTUPS_BY_TEAM_QUERY = gql`
  query GetStartupsByTeam($teamId: ID!) {
    getStartupsByTeam(teamId: $teamId) {
      _id
      name
      description
      status
      observation
      sprints {
        orderNumber
        name
        status
      }
      createdAt
    }
  }
`;

export const GET_STARTUPS_BY_STATUS_QUERY = gql`
  query GetStartupsByStatus($status: StartupStatus!) {
    getStartupsByStatus(status: $status) {
      _id
      name
      description
      okrId {
        id
        name
      }
      teamId {
        id
        name
      }
      status
      observation
      createdAt
    }
  }
`;

export const GET_PENDING_REVIEW_STARTUPS_QUERY = gql`
  query GetPendingReviewStartups {
    getPendingReviewStartups {
      _id
      name
      description
      okrId {
        id
        name
      }
      teamId {
        id
        name
      }
      status
      createdAt
    }
  }
`;

export const CREATE_STARTUP_MUTATION = gql`
  mutation CreateStartup($input: CreateStartupInput!) {
    createStartup(input: $input) {
      _id
      name
      description
      okrId {
        id
        name
      }
      teamId {
        id
        name
      }
      status
      sprints {
        orderNumber
        name
        status
      }
      createdAt
    }
  }
`;

export const UPDATE_STARTUP_MUTATION = gql`
  mutation UpdateStartup($id: ID!, $input: UpdateStartupInput!) {
    updateStartup(id: $id, input: $input) {
      _id
      name
      description
      okrId {
        id
        name
      }
      teamId {
        id
        name
      }
      updatedAt
    }
  }
`;

export const UPDATE_STARTUP_STATUS_MUTATION = gql`
  mutation UpdateStartupStatus($id: ID!, $status: StartupStatus!, $observation: String) {
    updateStartupStatus(id: $id, status: $status, observation: $observation) {
      _id
      name
      status
      observation
      updatedAt
    }
  }
`;

export const UPDATE_SPRINT_MUTATION = gql`
  mutation UpdateSprint($startupId: ID!, $sprintOrderNumber: Int!, $input: UpdateSprintInput!) {
    updateSprint(startupId: $startupId, sprintOrderNumber: $sprintOrderNumber, input: $input) {
      _id
      sprints {
        orderNumber
        name
        deliverable
        startDate
        endDate
        status
      }
    }
  }
`;

export const ADD_MODULE_TO_SPRINT_MUTATION = gql`
  mutation AddModuleToSprint($startupId: ID!, $sprintOrderNumber: Int!, $input: AddModuleInput!) {
    addModuleToSprint(startupId: $startupId, sprintOrderNumber: $sprintOrderNumber, input: $input) {
      _id
      sprints {
        orderNumber
        name
        modules {
          name
          task
          responsible {
            id
            userId {
              email
              name
            }
          }
          status
          deadline
        }
      }
    }
  }
`;

export const UPDATE_MODULE_STATUS_MUTATION = gql`
  mutation UpdateModuleStatus($startupId: ID!, $sprintOrderNumber: Int!, $moduleIndex: Int!, $status: ModuleStatus!) {
    updateModuleStatus(startupId: $startupId, sprintOrderNumber: $sprintOrderNumber, moduleIndex: $moduleIndex, status: $status) {
      _id
      sprints {
        orderNumber
        modules {
          name
          status
        }
      }
    }
  }
`;

export const DELETE_STARTUP_MUTATION = gql`
  mutation DeleteStartup($id: ID!) {
    deleteStartup(id: $id)
  }
`;