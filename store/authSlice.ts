import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';

interface Status {
   state: 'pending' | 'logged-in' | 'logged-out';
   user: string | null;
}

interface InitialState {
   token: string | null;
   status: Status;
}

const initialState: InitialState = {
   token: null,
   status: {
      state: 'logged-out',
      user: null,
   },
};

// Create the async thunk
export const loginUser = createAsyncThunk(
   'auth/loginUser',
   async (userId: string, thunkAPI) => {
      const response: { data: string } = await new Promise(resolve => {
         setTimeout(() => {
            resolve({ data: userId });
         }, 1000);
      });

      return response.data;
   },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async thunkAPI => {
   const response: string = await new Promise(resolve => {
      setTimeout(() => {
         resolve('ok');
      }, 1000);
   });

   return response;
});

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      // handle regular actions
   },
   // handle async thunk actions
   extraReducers: builder => {
      builder
         .addCase(loginUser.pending, (state: InitialState) => {
            state.status.state = 'pending';
         })
         .addCase(loginUser.fulfilled, (state: InitialState, action) => {
            state.status.state = 'logged-in';
            state.status.user = action.payload;
            state.token = action.payload;
         })
         .addCase(logoutUser.pending, (state: InitialState) => {
            state.status.state = 'pending';
         })
         .addCase(logoutUser.fulfilled, (state: InitialState, action) => {
            state.status.state = 'logged-out';
            state.token = null;
         });
   },
});

export const getAuthToken = (state: RootState) => state.root.auth.token;
export const getAuthStatus = (state: RootState) => state.root.auth.status;

export default authSlice.reducer;
