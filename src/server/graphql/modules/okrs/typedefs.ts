export const okrsTypeDefs = `#graphql
  type OKR {
    id: ID!
    title: String!
    description: String!
    owner: Team!
    status: OKRStatus!
    startDate: String
    endDate: String
    createdBy: User!
    createdAt: String!
    updatedAt: String!
  }

  enum OKRStatus {
    draft
    pending
    in_progress
    completed
  }

  type Query {
    okrs: [OKR!]! 
    okr(id: ID!): OKR
    teamOkrs(teamId: ID!): [OKR!]! 
    draftOkrs(teamId: ID!): [OKR!]!  # Query específica para borradores
  }

  input CreateOKRInput {
    title: String!
    description: String!
    owner: ID!
    startDate: String!
    endDate: String!
  }

  input UpdateOKRInput {
    title: String
    description: String
    status: OKRStatus
    startDate: String
    endDate: String
  }

  input CreateDraftOKRInput {
    title: String!
    description: String!
    owner: ID!
  }

  type Mutation {
    createOKR(input: CreateOKRInput!, createdBy: ID!): OKR!
    createDraftOKR(input: CreateDraftOKRInput!, createdBy: ID!): OKR!
    updateOKR(id: ID!, input: UpdateOKRInput!): OKR!
    deleteOKR(id: ID!): Boolean!
    publishDraft(id: ID!, startDate: String!, endDate: String!): OKR!  # Nueva mutation
  }
`;
