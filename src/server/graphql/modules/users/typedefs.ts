export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Role!
    status: Status!
    #passwordSetupToken: String
    #passwordSetupExpires: Date
    createdAt: String!
    updatedAt: String!
  }

  #type PasswordValidationResponse {
  #  valid: Boolean!
  #  message: String!
  #  email: String
  #}

  enum Role {
    ADMIN
    USER
  }

  enum Status {
    pending
    active
    inactive
    on_leave
  }

  type Query {
    users: [User!]!
    user(id: ID!): User!
    validatePasswordToken(token: String!): Boolean!
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