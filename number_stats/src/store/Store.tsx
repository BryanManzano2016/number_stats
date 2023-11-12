import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import CategoryReducer from './Categories';

export const store = configureStore({
  reducer: {
    categories: CategoryReducer,
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
