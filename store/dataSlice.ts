import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Note } from '../types/user';
import { RootState } from './store';

interface InitialState {
   notes: Note[];
   loading: boolean;
}

const initialState: InitialState = {
   notes: [],
   loading: false,
};

// Create the async thunk
export const addNote = createAsyncThunk('data/addNote', async (note: Note, thunkAPI) => {
   const response: { data: Note } = await new Promise(resolve => {
      setTimeout(() => {
         resolve({ data: note });
      }, 1000);
   });

   return response.data;
});

export const removeNote = createAsyncThunk(
   'data/removeNote',
   async (text: string, thunkAPI) => {
      const response: { data: string } = await new Promise(resolve => {
         setTimeout(() => {
            resolve({ data: text });
         }, 1000);
      });

      return response;
   },
);

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      setNote: (state, action: PayloadAction<Note>) => {
         const { value, user, date } = action.payload;
         state.notes.push({ value, user, date });
      },
   },
   extraReducers(builder) {
      builder.addCase(addNote.pending, (state, action) => {
         state.loading = true;
      });
      builder.addCase(addNote.fulfilled, (state, action) => {
         const { value, user, date } = action.payload;
         state.notes.push({ value, user, date });
         state.loading = false;
      });

      builder.addCase(removeNote.fulfilled, (state, action) => {
         const { data } = action.payload;
         state.notes = state.notes.filter(note => note.value !== data);
      });
   },
});

export const { setNote } = dataSlice.actions;
export const loadingSelector = (state: RootState) => state.root.dataSlice.loading;

export default dataSlice.reducer;
