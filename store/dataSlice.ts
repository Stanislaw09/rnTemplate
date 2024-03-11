import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { UserState } from '../types/user';

const initialState: UserState = {
   node: {
      value: '',
      user: null,
      date: null,
   },
};

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      setUser: (state, action: PayloadAction<UserState>) => {
         state.node = {
            user: action.payload.node.user,
            value: action.payload.node.value,
            date: action.payload.node.date,
         };
      },
      clearText: state => {
         state.node = {
            value: '',
            user: null,
            date: null,
         };
      },
   },
});

export const { setUser } = dataSlice.actions;
export const textSelector = (state: { data: UserState }) => state.data;

export default dataSlice.reducer;
