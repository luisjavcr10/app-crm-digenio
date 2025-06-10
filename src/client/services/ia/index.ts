import { gql } from "@apollo/client";

export const GET_DEEPSEEK_RECOMMENDATION = gql`
  query GetDeepSeekRecommendation($messages: [DeepSeekMessageInput!]!) {
    getDeepSeekRecommendation(messages: $messages) {
      choices {
        message {
          content
        }
      }
    }
  }
`;