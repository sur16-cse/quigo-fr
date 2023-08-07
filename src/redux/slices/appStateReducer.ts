// In your Redux slice (appStateReducer.ts):

import { Roles } from '@/lib/types';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface AppStateType {
  current_role: Roles;
  email: string;
  isLogged: boolean;
}

const initialState: AppStateType = {
  current_role: Roles.GUEST,
  email: '',
  isLogged: false,
};

export const appSlice = createSlice({
  name: 'appState',
  initialState,
  reducers: {
    setAppState: (state: AppStateType, action: PayloadAction<Partial<AppStateType>>) => {
      // Partial<AppStateType> allows updating only the specified properties
      // action.payload should be an object containing the properties to be updated
      Object.assign(state, action.payload);
    },
  },
});

export const { setAppState } = appSlice.actions;

export default appSlice.reducer;
