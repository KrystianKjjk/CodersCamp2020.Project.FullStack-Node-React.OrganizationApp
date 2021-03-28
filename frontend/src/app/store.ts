import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import loginReducer from '../components/LogIn/LogInSlice';
import counterReducer from '../components/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login: loginReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
