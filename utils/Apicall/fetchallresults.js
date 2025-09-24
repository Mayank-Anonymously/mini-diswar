// utils/Apicall/fetchallresults.js
import axios from 'axios';
import { HOST } from '../static';

export const fetchallapi = async () => {
	try {
		const response = await axios.get(`${HOST}/fetch-result-direct`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		return response.data.data; // return the data to be used in Redux
	} catch (error) {
		console.error('Error in fetchallapi:', error);
		throw error; // Let Redux Toolkit handle the rejection
	}
};
