export const startupsTypeDefs = `#graphql
  type Startup {
    _id: ID!
    client: String!
    name: String!
    description: String!
    responsible: String!
    monthlyMetric: String!
    metric: String!
    currentValue: Float!
    expectedValue: Float!
    createdAt: String
    updatedAt: String
  }

  type Query {
    getStartup(id: ID!): Startup
    getAllStartups: [Startup!]!
    getStartupsByClient(client: String!): [Startup!]!
    getStartupsByResponsible(responsible: String!): [Startup!]!
  }

  type Mutation {
    createStartup(
      client: String!
      name: String!
      description: String!
      responsible: String!
      monthlyMetric: String!
      metric: String!
      currentValue: Float
      expectedValue: Float!
    ): Startup!

    updateStartup(
      id: ID!
      client: String
      name: String
      description: String
      responsible: String
      monthlyMetric: String
      metric: String
      currentValue: Float
      expectedValue: Float
    ): Startup!

    deleteStartup(id: ID!): Startup!
    updateStartupMetrics(id: ID!, currentValue: Float!): Startup!
  }
`;