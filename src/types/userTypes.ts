export type UserType = {
  id: number;
  email: string;
  isActivated: boolean;
  role: 'ADMIN' | 'USER';
};

export interface UserResponse {
  accessToken: string;
  refreshToken: string;
  user: UserType;
}

export interface UserState {
  isAuth: boolean;
  isLoading: boolean;
  isError: null | string;
  data: UserType;
}

export type UserBody = {
  password: string;
  email: string;
};
