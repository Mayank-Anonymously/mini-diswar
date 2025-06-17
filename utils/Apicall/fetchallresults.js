import axios from 'axios';
import { HOST } from '../static';

export const fetchallapi = async (setdata) => {
	try {
		const response = await axios.get(`${HOST}/fetch-result-direct`, {
			headers: {
				'Content-type': 'application/json',
			},
		});
		setdata(response.data.data);
	} catch (error) {
		console.error(error);
	}
};



