import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userSlice from './slices/userSlice';

const rootReducer = combineReducers({
  userReducer: userSlice,
});

export const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStore, unknown, Action>;
export const wrapper = createWrapper<AppStore>(store, { debug: false });
