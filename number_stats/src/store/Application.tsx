import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './Store';

export interface State {
  titleDrawer?: string;
}

const initialState: State = {
  titleDrawer: undefined,
};

export const applicationSlice = createSlice({
  name: 'application',
  initialState,
  reducers: {
    setTitleDrawer: (state, action: PayloadAction<string>) => {
      state.titleDrawer = action.payload;
    },
  },
});

export const {setTitleDrawer} = applicationSlice.actions;

export const getTitleDrawer = (state: RootState) =>
  state.application.titleDrawer;

export default applicationSlice.reducer;
