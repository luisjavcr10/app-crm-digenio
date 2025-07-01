export const userTypeDefs = `#graphql
  type User {
    id: ID!
    name: String!
    email: String!
    password: String!
    role: Role!
    status: Status!
    passwordSetupToken: String
    passwordSetupExpires: String
    resetPasswordToken: String
    resetPasswordExpires: String
    createdAt: String!
    updatedAt: String!
  }

  type PasswordValidationResponse {
    valid: Boolean!
    message: String!
    email: String
  }

  type SetPasswordResult{
    success: Boolean!
    message: String!
  }

  type PasswordResetRequestResponse {
    success: Boolean!
    message: String!
  }

  type PasswordResetResult {
    success: Boolean!
    message: String!
  }

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
    validatePasswordToken(token: String!): PasswordValidationResponse!
    validateResetPasswordToken(token: String!): PasswordValidationResponse!
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

    setPasswordFromToken(
      token:String!
      password:String!
    ):SetPasswordResult!
    
    requestPasswordReset(email: String!): PasswordResetRequestResponse!

    resetPasswordWithToken(token: String!, newPassword: String!): PasswordResetResult!
  }
`;