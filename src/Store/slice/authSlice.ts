import { createSlice } from '@reduxjs/toolkit';
<<<<<<< HEAD
=======
import { User } from 'firebase/auth';

interface AuthState {
  // undefined meaning app / auth fully not loaded
  user: null | User | undefined;
}
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365

const authSlice = createSlice({
  name: 'auth',
  initialState: {
<<<<<<< HEAD
    value: 0,
  },
  reducers: {
  
=======
    user: undefined,
  } as AuthState,
  reducers: {
    updateAuthState: (state, { payload }: { payload: any | null }) => {
      state.user = payload;
    },
>>>>>>> b90f53174b0f2dccc9729fddeb43c19bbc5ba365
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
