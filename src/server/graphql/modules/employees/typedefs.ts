export const employeeTypeDefs = `#graphql
  type Query {
    employees: [Employee!]!
    employee(id: ID!): Employee!
  }

  type Mutation {
    createEmployee(
      userData: UserInput!
      employeeData: EmployeeInput!
    ): Employee!
    updateEmployee(
      id: ID!
      updateData: EmployeeUpdateInput!
    ): Employee!
    deleteEmployee(id: ID!): Employee!
    softDeleteEmployee(id: ID!): Boolean
  }

  type Employee {
    id: ID!
    userId: User!
    employeeId: String
    position: String!
    skills: [String!]!
    contactInfo: ContactInfo!
    status: EmployeeStatus!
    hireDate: String!
    teams: [Team!]!
    createdAt: String!
    updatedAt: String!
  }

  type ContactInfo {
    phone: String!
    emergencyContact: String!
  }

  enum EmployeeStatus {
    active
    inactive
    on_leave
  }

  input ContactInfoInput {
    phone: String!
    emergencyContact: String!
  }

  input EmployeeInput {
    position: String!
    skills: [String!]!
    contactInfo: ContactInfoInput!
    status: EmployeeStatus
    hireDate: String
    teams: [ID!]
  }

  input EmployeeUpdateInput {
    position: String
    skills: [String!]
    contactInfo: ContactInfoInput
    status: EmployeeStatus
  }

  input UserInput {
    name: String!
    email: String!
    roles: [Role!]!
  }

  enum Role {
    ADMIN
    TEAMLEADER
    EMPLOYEE
  }
`;