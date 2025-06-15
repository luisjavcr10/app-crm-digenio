export const okrsTypeDefs = `#graphql
  type OKR {
    id: ID!
    title: String!
    description: String!
    owner: String!
    status: String
    startDate: String!
    endDate: String!
    userId: String!
  }

  type Query {
    getOKRs: [OKR!]!
    getOKR(id: ID!): OKR
  }

  type Mutation {
    createOKR(
      title: String!
      description: String!
      owner: String!
      status: String
      startDate: String!
      endDate: String!
      userId: String!
    ): OKR!

    updateOKR(
      id: ID!
      title: String
      description: String
      owner: String
      status: String
      startDate: String
      endDate: String
      userId: String
    ): OKR!

    deleteOKR(id: ID!): Boolean!
  }
`;
