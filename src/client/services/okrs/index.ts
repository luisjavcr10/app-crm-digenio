import { gql } from "@apollo/client";

export const GET_OKRS_QUERY = gql`
  query OKRs {
    okrs {
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
  mutation CreateOKR(
    $title: String!
    $description: String!
    $owner: String!
    $status: String!
    $startDate: String!
    $endDate: String!
    $userId: String!
  ) {
    createOKR(
      title: $title
      description: $description
      owner: $owner
      status: $status
      startDate: $startDate
      endDate: $endDate
      userId: $userId
    ) {
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

export const UPDATE_OKR_MUTATION = gql`
  mutation UpdateOKR(
    $id: ID!
    $title: String
    $description: String
    $owner: String
    $status: String
    $startDate: String
    $endDate: String
    $userId: String
  ) {
    updateOKR(
      id: $id
      title: $title
      description: $description
      owner: $owner
      status: $status
      startDate: $startDate
      endDate: $endDate
      userId: $userId
    ) {
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

export const DELETE_OKR_MUTATION = gql`
  mutation DeleteOKR($id: ID!) {
    deleteOKR(id: $id)
  }
`;
