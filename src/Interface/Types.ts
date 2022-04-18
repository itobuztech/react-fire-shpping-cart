export interface login {
  email: string;
  password: string;
}

export interface registration {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface resetPassword {
  password: string;
  confirmPassword: string;
}