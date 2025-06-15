export const iaTypeDefs = `#graphql
  type DeepSeekMessage {
    role: String!
    content: String!
  }

  type DeepSeekChoice {
    message: DeepSeekMessage!
    finish_reason: String
    index: Int
  }

  type DeepSeekResponse {
    id: String
    object: String
    created: Int
    model: String
    choices: [DeepSeekChoice!]
  }

  input DeepSeekMessageInput {
    role: String!
    content: String!
  }

  type Query {
    getDeepSeekRecommendation(messages: [DeepSeekMessageInput!]!): DeepSeekResponse
  }
`;