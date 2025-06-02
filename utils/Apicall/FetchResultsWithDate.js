import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { HOST } from '../static';

const FetchResultsWithDate = (curmomnet, title, setdata, mode, setLoading) => {
	setLoading(true);
	const formatdate = moment(curmomnet).format('YYYY-MM-DD');
	console.log(`${HOST}/fetch-results-by-month/${formatdate}/${title}/${mode}`);
	const options = {
		method: 'GET',
		url: `${HOST}/fetch-results-by-month/${formatdate}/${title}/${mode}`,
		headers: {
			'Content-type': 'application/json',
		},
	};
	setLoading(true);
	axios
		.request(options)
		.then(function (response) {
			setdata(response.data.data);
			setLoading(false);
		})
		.catch(function (error) {
			console.error(error);
			setLoading(false);
		});
};

export default FetchResultsWithDate;
