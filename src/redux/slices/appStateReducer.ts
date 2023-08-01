import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppStateType {
  current_role: Roles
}

const initialState: AppStateType = {
  current_role: Roles.GUEST,
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAppState: (state: any, action: PayloadAction<any>) => {
      const {
        payload: { title, value },
      } = action;

      state[title] = value;
    },
  },
});

export const {
  setAppState,
} = appSlice.actions;

export default appSlice.reducer;