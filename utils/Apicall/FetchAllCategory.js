import axios from 'axios';
import { HOST } from '../static';

export const fetchallcategoryapi = (setdata) => {
	const options = {
		method: 'GET',
		url: `${HOST}/fetch-result-direct`,
		headers: {
			'Content-type': 'application/json',
		},
	};
	axios
		.request(options)
		.then(function (response) {
			setdata(response.data.data);
		})
		.catch(function (error) {
			console.error(error);
		});
};
