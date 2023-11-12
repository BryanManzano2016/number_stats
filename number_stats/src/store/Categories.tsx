import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './Store';

export interface State {
  idSelected?: string;
}

const initialState: State = {
  idSelected: undefined,
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setIdSelected: (state, action: PayloadAction<string>) => {
      state.idSelected = action.payload;
    },
  },
});

export const {setIdSelected} = categorySlice.actions;

export const getIdSelected = (state: RootState) => state.categories.idSelected;

export default categorySlice.reducer;
