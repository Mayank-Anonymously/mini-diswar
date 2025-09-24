import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	Modal,
	Button,
	ScrollView,
	ActivityIndicator,
} from 'react-native';
import React, { useState, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import { useSelector } from 'react-redux';
import FetchResultsWithDate from '../../utils/Apicall/FetchResultsWithDate';

const ResultsScreen = () => {
	const selected = useSelector((state) => state.selectedResult.selected);
	console.log(selected);
	const [show, setShow] = useState(false);
	const [calendarDate, setDate] = useState(new Date());
	const [data, setData] = useState([]);
	const [loading, setLoading] = useState(selected?.loadingg ?? true);
	const [selectedMoment, setSelectedMoment] = useState('');

	const defaultMoment = moment().format();

	const { title, item, date, mode } = selected || {};

	useFocusEffect(
		useCallback(() => {
			if (!title) return;
			setLoading(true);
			FetchResultsWithDate(defaultMoment, title, setData, mode, setLoading);
		}, [title])
	);

	const handleChange = (event, selectedDate) => {
		const pickedDate = selectedDate || calendarDate;
		setShow(false);
		setDate(pickedDate);
		setSelectedMoment(pickedDate);
		setLoading(true);
		FetchResultsWithDate(pickedDate, title, setData, mode, setLoading);
	};

	const currentDate = selectedMoment !== '' ? selectedMoment : defaultMoment;

	return (
		<View style={{ flex: 1, backgroundColor: '#f7d560' }}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Pressable onPress={() => setShow(true)}>
					<Text style={styles.dateButton}>
						{moment(calendarDate).format('DD-MM-YYYY')}
					</Text>
				</Pressable>
			</View>

			{loading ? (
				<ActivityIndicator
					size='large'
					color='#0000ff'
				/>
			) : (
				<View style={styles.resultBox}>
					<View style={styles.resultHeader}>
						<Text style={styles.resultHeaderText}>Date/Time</Text>
						<Text style={styles.resultHeaderText}>Number</Text>
					</View>

					{title === 'Minidiswar' ? (
						<ScrollView style={{ marginTop: 10 }}>
							{data?.map((itex, idx) => (
								<View
									key={idx}
									style={{ marginBottom: 120 }}>
									{itex.result
										.filter(
											(i) => i.date === moment(currentDate).format('YYYY-MM-DD')
										)
										.map((resItem, resIdx) => (
											<View key={resIdx}>
												{resItem.times.map((timeItem, timeIdx) => (
													<View
														key={timeIdx}
														style={styles.resultRow}>
														<Text style={styles.resultText}>
															{timeItem.time}
														</Text>
														<Text style={styles.resultText}>
															{timeItem.number}
														</Text>
													</View>
												))}
											</View>
										))}
								</View>
							))}
						</ScrollView>
					) : (
						<ScrollView style={{ marginTop: 10 }}>
							{data?.map((itex, idx) => (
								<View
									key={idx}
									style={{ marginBottom: 120 }}>
									{itex.result?.map((resItem, resIdx) => (
										<View
											key={resIdx}
											style={styles.resultRow}>
											<Text style={styles.resultText}>
												{mode === 'scraper' ? resItem.date : resItem.time}
											</Text>
											<Text style={styles.resultText}>{resItem.number}</Text>
										</View>
									))}
								</View>
							))}
						</ScrollView>
					)}

					{Platform.OS === 'android' && show && (
						<DateTimePicker
							value={calendarDate}
							mode='date'
							display='default'
							onChange={handleChange}
						/>
					)}

					{Platform.OS === 'ios' && (
						<Modal
							transparent={true}
							visible={show}
							animationType='slide'
							onRequestClose={() => setShow(false)}>
							<View style={styles.modalBackground}>
								<View style={styles.modalContent}>
									<DateTimePicker
										value={calendarDate}
										mode='date'
										display='spinner'
										onChange={handleChange}
									/>
									<Button
										title='Done'
										onPress={() => setShow(false)}
									/>
								</View>
							</View>
						</Modal>
					)}
				</View>
			)}
		</View>
	);
};

export default ResultsScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
	header: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginHorizontal: 20,
		marginVertical: 20,
		alignItems: 'center',
	},
	dateButton: {
		backgroundColor: 'darkblue',
		color: 'white',
		padding: 10,
		borderRadius: 10,
		fontSize: 16,
	},
	resultBox: {
		marginHorizontal: 20,
		padding: 10,
		borderRadius: 10,
	},
	resultHeader: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		borderBottomWidth: 1,
		borderBottomColor: 'whitesmoke',
	},
	resultHeaderText: {
		textAlign: 'center',
		fontSize: 18,
		fontWeight: 'bold',
	},
	resultRow: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		marginTop: 10,
		borderBottomWidth: 1,
		borderBottomColor: 'whitesmoke',
		margin: 10,
		backgroundColor: 'white',
		borderRadius: 10,
		padding: 10,
	},
	resultText: {
		textAlign: 'center',
		fontSize: 18,
	},
	modalBackground: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: 'rgba(0,0,0,0.5)',
	},
	modalContent: {
		backgroundColor: 'white',
		padding: 20,
		borderRadius: 10,
		alignItems: 'center',
	},
});
