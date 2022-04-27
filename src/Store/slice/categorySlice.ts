import { createSlice } from '@reduxjs/toolkit';
import { CategoryActionIf } from './../../Interface/categoryaction.interface';

const category : CategoryActionIf[] = [];

const categorySlice = createSlice({
  name: 'category',
  initialState: category,
  reducers: {
    addCategory: (state: CategoryActionIf[], action) => {
      const newCategory = {
        id: String(new Date().getTime()),
        catName: action.payload.catName,
        catDesc: action.payload.catDesc,
        catImage: action.payload.catImage
      };
      state.push(newCategory);
    }
  },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
