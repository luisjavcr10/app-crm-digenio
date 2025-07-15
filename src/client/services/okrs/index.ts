import { gql } from "@apollo/client";

export const GET_OKRS_QUERY = gql`
  query OKRs($userId: ID) {
    okrs(userId: $userId) {
      id
      name
      description
      status
      startDate
      endDate
      createdBy {
        email
      }
    }
  }
`;

export const FOLLOW_UP_OKRS_QUERY = gql`
  query NoDraftOkrs {
    noDraftOkrs {
      id
      name
      status
      startups {
        name
        status
        sprints {
          status
          modules {
            status
          }
        }
      }   
    }
  }
`;

export const GET_OKR_QUERY = gql`
  query GetOKR($id: ID!) {
    getOKR(id: $id) {
      id
      title
      description
      owner
      status
      startDate
      endDate
      userId
    }
  }
`;

export const CREATE_OKR_MUTATION = gql`
  mutation CreateOKR($input: CreateOKRInput!, $createdBy: ID!) {
    createOKR(input: $input, createdBy: $createdBy) {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;

export const UPDATE_OKR_MUTATION = gql`
  mutation UpdateOKR($id: ID!, $input: UpdateOKRInput!) {
    updateOKR(id: $id, input: $input) {
      id
      name
      description
      status
      startDate
      endDate
    }
  }
`;

export const DELETE_OKR_MUTATION = gql`
  mutation DeleteOKR($id: ID!) {
    deleteOKR(id: $id)
  }
`;
