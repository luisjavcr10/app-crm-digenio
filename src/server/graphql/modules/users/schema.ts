export const userTypeDefs = `#graphql
  type User {
    id: ID!
    email: String!
    password: String!
    firstName: String!
    lastName: String!
    role: String
    active: Boolean
  }

  type Query{
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation{
    createUser(
      email: String!
      password: String!
      firstName: String!
      lastName: String!
      role: String
      active: Boolean
    ): User!
    updateUser(
      id: ID!
      email: String
      password: String
      firstName: String
      lastName: String
      role: String
      active: Boolean
    ): User!
    deleteUser(id: ID!): User!
  }
`;