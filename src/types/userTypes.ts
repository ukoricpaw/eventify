export type UserType = {
  id: number;
  email: string;
  isActivated: boolean;
  role: 'ADMIN' | 'USER';
  avatar: string | null;
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
  userData: UserType;
}

export type UserBody = {
  password: string;
  email: string;
};
