export const employeeTypeDefs = `#graphql
  type ContactInfo {
    phone: String!
    emergencyContact: String!
  }

  type Employee {
    id: ID!
    userId: User!
    employeeId: String
    position: String!
    department: String!
    skills: [String!]!
    contactInfo: ContactInfo!
    status: EmployeeStatus!
    hireDate: String!
    teams: [Team!]!
    createdAt: String!
    updatedAt: String!
  }

  enum EmployeeStatus {
    active
    inactive
    on_leave
  }

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
  }

  input ContactInfoInput {
    phone: String!
    emergencyContact: String!
  }

  input EmployeeInput {
    position: String!
    department: String!
    skills: [String!]!
    contactInfo: ContactInfoInput!
    status: EmployeeStatus
    hireDate: String
    teams: [ID!]
  }

  input EmployeeUpdateInput {
    position: String
    department: String
    skills: [String!]
    contactInfo: ContactInfoInput
    status: EmployeeStatus
  }

  input UserInput {
    name: String!
    email: String!
    #password: String!
    role: Role
  }

  enum Role {
    ADMIN
    USER
  }
`;