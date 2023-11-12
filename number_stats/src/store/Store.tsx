import {Action, ThunkAction, configureStore} from '@reduxjs/toolkit';
import CategoryReducer from './Categories';
import ApplicationReducer from './Application';

export const store = configureStore({
  reducer: {
    categories: CategoryReducer,
    application: ApplicationReducer,
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
