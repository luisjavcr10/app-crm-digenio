import { gql } from "@apollo/client";

export const LOGIN_MUTATION = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      name
      email
      role
    }
  }
`;

export const LOGOUT_MUTATION = gql`
  mutation Logout {
    logout
  }
`;

export const VALIDATE_PASSWORD_TOKEN = gql`
  query ValidatePasswordToken($token: String!) {
    validatePasswordToken(token: $token) {
      valid
      email
      message
    }
  }
`;

export const SET_PASSWORD_FROM_TOKEN = gql`
  mutation SetPasswordFromToken($token: String!, $password: String!) {
    setPasswordFromToken(token: $token, password: $password) {
      success
      message
    }
  }
`;

export const REQUEST_PASSWORD_RESET = gql`
  mutation RequestPasswordReset($email: String!) {
    requestPasswordReset(email: $email) {
      success
      message
    }
  }
`;

export const PASSWORD_RESET_RESULT = gql `
  mutation PasswordResetResult($token: String!, $newPassword: String!) {
    resetPasswordWithToken(token: $token, newPassword: $newPassword) {
      success
      message
    }
  }
`;

export const VALIDATE_RESET_PASSWORD_TOKEN = gql`
  query ValidateResetPasswordToken($token: String!) {
    validateResetPasswordToken(token: $token) {
      valid
      email
      message
    }
  }
`;
