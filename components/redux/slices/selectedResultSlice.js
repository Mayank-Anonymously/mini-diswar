import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	selected: null,
};

const selectedResultSlice = createSlice({
	name: 'selectedResult',
	initialState,
	reducers: {
		setSelectedResult: (state, action) => {
			state.selected = action.payload;
		},
		clearSelectedResult: (state) => {
			state.selected = null;
		},
	},
});

export const { setSelectedResult, clearSelectedResult } =
	selectedResultSlice.actions;

export default selectedResultSlice.reducer;
