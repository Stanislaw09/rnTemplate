import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Music, Note, Track } from '../types/user';
import { RootState } from './store';
import axios, { AxiosError } from 'axios';

interface InitialState {
   notes: Note[];
   loading: boolean;
   music: Track[];
}

const initialState: InitialState = {
   notes: [],
   music: [],
   loading: false,
};

// Create the async thunk
export const addTrack = createAsyncThunk(
   'data/addTrack',
   async (track: Track, thunkAPI) => {
      const response: { data: Track } = await new Promise(resolve => {
         setTimeout(() => {
            resolve({ data: track });
         }, 1000);
      });

      return response.data;
   },
);

export const removeTrack = createAsyncThunk(
   'data/removeTrack',
   async (id: number, thunkAPI) => {
      const response: { id: number } = await new Promise(resolve => {
         setTimeout(() => {
            resolve({ id });
         }, 1000);
      });

      return response;
   },
);

export const fetchMusic = createAsyncThunk('data/fetchMusic', thunkAPI => {
   return axios
      .get<Music>('https://my-json-server.typicode.com/stanislaw09/demo/db')
      .then(resp => {
         return resp.data.tracks;
      })
      .catch((err: AxiosError) => {
         console.log(err);
         throw new Error(`Error fetching data: ${err.message}`);
      });
});

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
      builder.addCase(addTrack.pending, (state, action) => {
         state.loading = true;
      });
      builder.addCase(addTrack.fulfilled, (state, action) => {
         const { author, id, title } = action.payload;
         state.music.push({ author, id, title });
         state.loading = false;
      });

      builder.addCase(removeTrack.fulfilled, (state, action) => {
         const { id } = action.payload;
         state.music = state.music.filter(track => track.id !== id);
      });

      builder
         .addCase(fetchMusic.pending, (state, action) => {
            state.loading = true;
         })
         .addCase(fetchMusic.fulfilled, (state, action) => {
            state.music = action.payload;
            state.loading = false;
         });
   },
});

export const { setNote } = dataSlice.actions;
export const loadingSelector = (state: RootState) => state.root.data.loading;
export const musicSelector = (state: RootState) => state.root.data.music;

export default dataSlice.reducer;
