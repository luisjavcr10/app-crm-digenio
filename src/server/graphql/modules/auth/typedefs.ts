export const authTypeDefs = `#graphql
  type AuthPayload {
    token: String!
    user: User!
  }

  extend type Mutation {
    login(email: String!, password: String!): User!
    logout: Boolean!
  }

  extend type Query {
    me: User
  }
`;