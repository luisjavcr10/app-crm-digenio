export const startupsTypeDefs = `#graphql
  enum StartupStatus {
    IDEA_PENDING_REVIEW
    IDEA_OBSERVED
    IDEA_REJECTED
    IN_PROGRESS
    COMPLETED
    PAUSED
  }

  enum ModuleStatus {
    PENDING
    IN_PROGRESS
    COMPLETED
    BLOCKED
  }

  enum SprintStatus {
    PLANNED
    IN_PROGRESS
    COMPLETED
    DELAYED
  }

  type Module {
    name: String!
    task: String!
    responsible: Employee!
    status: ModuleStatus!
    deadline: String!
  }

  type Sprint {
    orderNumber: Int!
    name: String!
    deliverable: String
    startDate: String
    endDate: String
    status: SprintStatus!
    modules: [Module!]!
  }

  type Startup {
    _id: ID!
    name: String!
    description: String!
    okrId: OKR!
    teamId: Team!
    status: StartupStatus!
    observation: String
    sprints: [Sprint!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateSprintInput {
    orderNumber: Int!
    name: String!
  }

  input CreateStartupInput {
    name: String!
    description: String!
    okrId: ID!
    teamId: ID!
    sprints: [CreateSprintInput!]!
  }

  input UpdateStartupInput {
    name: String
    description: String
    okrId: ID
    teamId: ID
    sprints: [CreateSprintInput!]
  }

  input UpdateSprintInput {
    deliverable: String
    startDate: String
    endDate: String
    status: SprintStatus
  }

  input AddModuleInput {
    name: String!
    task: String!
    responsible: ID!
    deadline: String!
  }

  type Query {
    getStartup(id: ID!): Startup
    getAllStartups: [Startup!]!
    getStartupsByOkr(okrId: ID!): [Startup!]!
    getStartupsByTeam(teamId: ID!): [Startup!]!
    getStartupsByStatus(status: StartupStatus!): [Startup!]!
    getPendingReviewStartups: [Startup!]!
  }

  type Mutation {
    createStartup(input: CreateStartupInput!): Startup!
    
    updateStartup(id: ID!, input: UpdateStartupInput!): Startup!
    
    updateStartupStatus(id: ID!, status: StartupStatus!, observation: String): Startup!
    
    updateSprint(startupId: ID!, sprintOrderNumber: Int!, input: UpdateSprintInput!): Startup!
    
    addModuleToSprint(startupId: ID!, sprintOrderNumber: Int!, input: AddModuleInput!): Startup!
    
    updateModuleStatus(startupId: ID!, sprintOrderNumber: Int!, moduleIndex: Int!, status: ModuleStatus!): Startup!
    
    deleteStartup(id: ID!): Boolean!
  }
`;