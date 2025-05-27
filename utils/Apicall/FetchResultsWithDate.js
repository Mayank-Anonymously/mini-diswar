import React from 'react';
import axios from 'axios';
import moment from 'moment';
import { HOST } from '../static';

const FetchResultsWithDate = (date, title, setdata) => {
	const formatdate = moment(date).format('YYYY-MM-DD');
	const options = {
		method: 'GET',
		url: `${HOST}/fetch-result-by-date/${formatdate}/${title}`,
		headers: {
			'Content-type': 'application/json',
		},
	};
	axios
		.request(options)
		.then(function (response) {
			console.log(response.data);
			setdata(response.data.data);
		})
		.catch(function (error) {
			console.error(error);
		});
};

export default FetchResultsWithDate;
