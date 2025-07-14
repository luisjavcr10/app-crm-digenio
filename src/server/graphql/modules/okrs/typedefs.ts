export const okrsTypeDefs = `#graphql
  type OKR {
    id: ID!
    name: String!
    description: String!
    startups: [Startup]
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

  input CreateOKRInput {
    name: String!
    description: String!
    status:OKRStatus!
    startDate: String
    endDate: String
  }

  type Query {
    okrs: [OKR!]! 
    okr(id: ID!): OKR
    draftOkrs: [OKR!]!
    noDraftOkrs: [OKR!]!
  }

  type Mutation {
    createOKR(input: CreateOKRInput!, createdBy: ID!): OKR!
    deleteOKR(id: ID!): Boolean!
  }
`;
