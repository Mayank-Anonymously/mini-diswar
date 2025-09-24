// src/redux/slices/resultsSlice.js
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchallapi } from '../../../utils/Apicall/fetchallresults';

const initialState = {
	data: [],
	status: 'idle',
	error: null,
};

// Async thunk to fetch data
export const fetchResults = createAsyncThunk(
	'results/fetchResults',
	async (_, thunkAPI) => {
		try {
			const data = await fetchallapi();
			return data;
		} catch (err) {
			return thunkAPI.rejectWithValue(err.message || 'Fetch failed');
		}
	}
);

const resultsSlice = createSlice({
	name: 'results',
	initialState,
	reducers: {},
	extraReducers: (builder) => {
		builder
			.addCase(fetchResults.pending, (state) => {
				state.status = 'loading';
			})
			.addCase(fetchResults.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.data = action.payload;
			})
			.addCase(fetchResults.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.error.message;
			});
	},
});

export default resultsSlice.reducer;
