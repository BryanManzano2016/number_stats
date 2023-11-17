import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type {RootState} from './Store';
import {cacheGetItem, cacheSetItem} from '../core/SimpleStorage';

export interface State {
  idSelected?: string;
}

const initialState: State = {
  idSelected: cacheGetItem('categorySelectId'),
};

export const categorySlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    categorySetIdSelected: (
      state,
      action: PayloadAction<string | undefined>,
    ) => {
      state.idSelected = action.payload;
      cacheSetItem('categorySelectId', action.payload ?? '');
    },
  },
});

export const {categorySetIdSelected} = categorySlice.actions;

export const getIdSelected = (state: RootState) => state.categories.idSelected;

export default categorySlice.reducer;
