import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { Note } from '../types/user';

interface InitialState {
   note: Note;
}

const initialState: InitialState = {
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
      setNote: (state, action: PayloadAction<Note>) => {
         const { value, user, date } = action.payload;
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
// export const textSelector = (state: { data: NoteState }) => state.data;

export default dataSlice.reducer;
