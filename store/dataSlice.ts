import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { NoteState } from '../types/user';

const initialState: NoteState = {
   note: {
      value: '',
      user: null,
      date: null,
   },
};

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      setNote: (state, action: PayloadAction<NoteState>) => {
         const { value, user, date } = action.payload.note;
         state.note = {
            value,
            user,
            date,
         };
      },
      clearText: state => {
         state.note = {
            value: '',
            user: null,
            date: null,
         };
      },
   },
});

export const { setNote } = dataSlice.actions;
export const textSelector = (state: { data: NoteState }) => state.data;

export default dataSlice.reducer;
