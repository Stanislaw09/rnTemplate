import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState } from './store';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface InitialState {
   token: string | null;
   status: 'pending' | 'logged-in' | 'logged-out';
}

const initialState: InitialState = {
   token: null,
   status: 'logged-out',
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

      try {
         await AsyncStorage.setItem('auth-token', response.data);
      } catch (e) {
         throw new Error('Error saving token to storage');
      }

      return response.data;
   },
);

export const logoutUser = createAsyncThunk('auth/logoutUser', async thunkAPI => {
   const response: string = await new Promise(resolve => {
      setTimeout(() => {
         resolve('ok');
      }, 1000);
   });

   try {
      await AsyncStorage.removeItem('auth-token');
   } catch (e) {
      throw new Error('Error removing token');
   }

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
      builder.addCase(loginUser.pending, (state: InitialState) => {
         state.status = 'pending';
      });
      builder.addCase(loginUser.fulfilled, (state: InitialState, action) => {
         state.status = 'logged-in';
         state.token = action.payload;
      });
      builder.addCase(logoutUser.pending, (state: InitialState) => {
         state.status = 'pending';
      });
      builder.addCase(logoutUser.fulfilled, (state: InitialState, action) => {
         state.status = 'logged-out';
         state.token = null;
      });
   },
});

export const getAuthToken = (state: RootState) => state.auth.token;
export const getAuthStatus = (state: RootState) => state.auth.status;

export default authSlice.reducer;
