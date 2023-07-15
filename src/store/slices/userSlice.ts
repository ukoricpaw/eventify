import { UserState, UserType } from '@/types/userTypes';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';
import { RootState } from '..';

const initialState: UserState = {
  isAuth: false,
  isLoading: false,
  isError: null,
  userData: {} as UserType,
};

const userSlice = createSlice({
  name: 'userSlice',
  initialState,
  reducers: {
    authLoading(state) {
      state.isLoading = true;
      state.isError = null;
      state.userData = {} as UserType;
      state.isAuth = false;
    },
    authSuccess(state, action: PayloadAction<UserType>) {
      state.isLoading = false;
      state.userData = action.payload;
      state.isAuth = true;
    },
    authError(state, action: PayloadAction<string | null>) {
      state.isError = action.payload;
      state.isLoading = false;
    },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.userReducer,
      };
    },
  },
});
export const userSelector = (store: RootState) => store.userReducer;
export const { authError, authLoading, authSuccess } = userSlice.actions;
export default userSlice.reducer;
