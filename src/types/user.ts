import { PropsWithErrs } from "../utils/types";

export type ApiError = {
  reason: string;
};

export type User = {
  first_name: string;
  second_name: string;
  phone: string;
  email: string;
  login?: string;
  password?: string;
  display_name?: string;
  avatar?: string;
  id?: number;
};

export type SignUpResponse = {
  id: number;
};

export type SignInInput = {
  login: string;
  password: string;
};

export type SignInInputErrors = PropsWithErrs<SignInInput>;

export type SignUpInput = {
  email: string;
  first_name: string;
  second_name: string;
  phone: string;
  password1: string;
} & SignInInput;

export type SignUpInputErrors = PropsWithErrs<SignUpInput>;

export type ChangePasswordInput = {
  oldPassword: string;
  newPassword: string;
};
