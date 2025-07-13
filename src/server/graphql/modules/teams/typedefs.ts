export const teamTypeDefs = `#graphql
  type Team {
    id: ID!
    name: String!
    description: String
    manager: Employee!
    members: [Employee!]!
    status: String!
    createdAt: String!
    updatedAt: String!
  }

  input CreateTeamInput {
    name: String!
    description: String
    managerId: ID!
    membersIds: [ID!]
  }

  input UpdateTeamInput {
    name: String
    description: String
    managerId: ID
    membersIds: [ID!]
    status: String
  }

  extend type Query {
    team(id: ID!): Team
    teams: [Team!]!
  }

  extend type Mutation {
    createTeam(input: CreateTeamInput!): Team!
    updateTeam(id: ID!, input: UpdateTeamInput!): Team!
    deleteTeam(id: ID!): Boolean!
    softDeleteTeam(id: ID!): Boolean!
    restoreTeam(id: ID!): Boolean!
  }
`;
