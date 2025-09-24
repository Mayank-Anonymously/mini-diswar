// src/app/store.js
import { configureStore } from '@reduxjs/toolkit';
import resultsReducer from '../redux/slices/resultSlice';
import selectedResultSlice from '../redux/slices/selectedResultSlice';

export const store = configureStore({
	reducer: {
		results: resultsReducer,
		selectedResult: selectedResultSlice,
	},
});
