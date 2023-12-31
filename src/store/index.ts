import { configureStore, combineReducers, ThunkAction, Action } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';
import userSlice from './slices/userSlice';
import { wspaceApi } from './api/wspaceApi';
import { deskApi } from './api/deskApi';
import deskSlice from './slices/deskSlice';
import listsSlice from './slices/listsSlice';

const rootReducer = combineReducers({
  userReducer: userSlice,
  [wspaceApi.reducerPath]: wspaceApi.reducer,
  [deskApi.reducerPath]: deskApi.reducer,
  deskReducer: deskSlice,
  listReducer: listsSlice,
});

export const store = () =>
  configureStore({
    reducer: rootReducer,
    devTools: true,
    middleware: getDefaultMiddleware => {
      return getDefaultMiddleware().concat([wspaceApi.middleware, deskApi.middleware]);
    },
  });

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof store>;
export type AppDispatch = AppStore['dispatch'];
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppStore, unknown, Action>;
export const wrapper = createWrapper<AppStore>(store, { debug: false });
