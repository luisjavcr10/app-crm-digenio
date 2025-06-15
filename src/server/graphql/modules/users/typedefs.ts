export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Role!
    status: Status!
    createdAt: String!
    updatedAt: String!
  }

  enum Role {
    ADMIN
    USER
  }

  enum Status {
    active
    inactive
    on_leave
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      role: Role
    ): User!
    updateUser(
      id: ID!
      name: String
      email: String
      password: String
      role: Role
      status: Status
    ): User!
    deleteUser(id: ID!): User!
  }
`;