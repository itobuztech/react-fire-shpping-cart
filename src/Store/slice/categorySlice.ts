import { createSlice } from '@reduxjs/toolkit';
import { CategoryActionInterface } from './../../Interface/categoryaction.interface';

const category : CategoryActionInterface[] = [];

const categorySlice = createSlice({
  name: 'category',
  initialState: category,
  reducers: {
    addCategory: (state: CategoryActionInterface[], action) => {
      const newCategory = {
        id: String(new Date().getTime()),
        categoryName: action.payload.categoryName,
        categoryDesc: action.payload.categoryDesc,
        categoryImage: action.payload.categoryImage
      };
      state.push(newCategory);
    }
  },
});

export const categoryActions = categorySlice.actions;
export const categoryReducer = categorySlice.reducer;
