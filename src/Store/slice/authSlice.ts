import { createSlice } from '@reduxjs/toolkit';

interface AuthState {
  // undefined meaning app / auth fully not loaded
  user: null | any | undefined;
}

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: undefined,
  } as AuthState,
  reducers: {
    updateAuthState: (state, { payload }: { payload: any | null }) => {
      state.user = payload;
    },
  },
});

export const authActions = authSlice.actions;
export const authReducer = authSlice.reducer;
