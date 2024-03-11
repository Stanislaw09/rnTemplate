import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface InitialState {
   text: string | null;
}

const initialState: InitialState = {
   text: null,
};

export const dataSlice = createSlice({
   name: 'data',
   initialState,
   reducers: {
      setText: (state, action: PayloadAction<string>) => {
         state.text = action.payload;
      },
      clearText: state => {
         state.text = null;
      },
   },
});

export const { setText } = dataSlice.actions;
export const textSelector = (state: { data: InitialState }) => state.data.text;

export default dataSlice.reducer;
