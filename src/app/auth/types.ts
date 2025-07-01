export interface SearchParamsProps {
  searchParams: Promise<{ token?: string }>;
}

export interface ValidateResetPasswordTokenResponse {
  validateResetPasswordToken: {
    email: string | null;
    message: string;
    valid: boolean;
  };
}

export interface ValidatePasswordTokenResponse {
  validatePasswordToken: {
    email: string | null;
    message: string;
    valid: boolean;
  };
}