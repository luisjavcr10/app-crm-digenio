import { gql } from "@apollo/client";

export const GET_STARTUP_QUERY = gql`
  query GetStartup($id: ID!) {
    getStartup(id: $id) {
      _id
      client
      name
      description
      responsible
      monthlyMetric
      metric
      currentValue
      expectedValue
      createdAt
      updatedAt
    }
  }
`;

export const GET_ALL_STARTUPS_QUERY = gql`
  query GetAllStartups {
    getAllStartups {
      _id
      client
      name
      description
      responsible
      monthlyMetric
      metric
      currentValue
      expectedValue
      createdAt
    }
  }
`;

export const GET_STARTUPS_BY_CLIENT_QUERY = gql`
  query GetStartupsByClient($client: String!) {
    getStartupsByClient(client: $client) {
      _id
      name
      description
      responsible
      currentValue
      expectedValue
      createdAt
    }
  }
`;

export const GET_STARTUPS_BY_RESPONSIBLE_QUERY = gql`
  query GetStartupsByResponsible($responsible: String!) {
    getStartupsByResponsible(responsible: $responsible) {
      _id
      name
      client
      monthlyMetric
      currentValue
      expectedValue
    }
  }
`;

export const CREATE_STARTUP_MUTATION = gql`
  mutation CreateStartup(
    $client: String!
    $name: String!
    $description: String!
    $responsible: String!
    $monthlyMetric: String!
    $metric: String!
    $expectedValue: Float!
    $currentValue: Float
  ) {
    createStartup(
      client: $client
      name: $name
      description: $description
      responsible: $responsible
      monthlyMetric: $monthlyMetric
      metric: $metric
      expectedValue: $expectedValue
      currentValue: $currentValue
    ) {
      _id
      name
      client
      createdAt
    }
  }
`;

export const UPDATE_STARTUP_MUTATION = gql`
  mutation UpdateStartup(
    $id: ID!
    $client: String
    $name: String
    $description: String
    $responsible: String
    $monthlyMetric: String
    $metric: String
    $currentValue: Float
    $expectedValue: Float
  ) {
    updateStartup(
      id: $id
      client: $client
      name: $name
      description: $description
      responsible: $responsible
      monthlyMetric: $monthlyMetric
      metric: $metric
      currentValue: $currentValue
      expectedValue: $expectedValue
    ) {
      _id
      name
      client
      currentValue
      expectedValue
      updatedAt
    }
  }
`;

export const UPDATE_STARTUP_METRICS_MUTATION = gql`
  mutation UpdateStartupMetrics($id: ID!, $currentValue: Float!) {
    updateStartupMetrics(id: $id, currentValue: $currentValue) {
      _id
      name
      currentValue
      expectedValue
      updatedAt
    }
  }
`;

export const DELETE_STARTUP_MUTATION = gql`
  mutation DeleteStartup($id: ID!) {
    deleteStartup(id: $id) {
      _id
      name
      client
    }
  }
`;