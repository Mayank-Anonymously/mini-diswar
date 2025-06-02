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
import { useFocusEffect, useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import FetchResultsWithDate from '../../utils/Apicall/FetchResultsWithDate';

const ResultsScreen = () => {
	const route = useRoute();
	const { title, item, date, mode, loadingg } = route.params;

	const [show, setShow] = useState(false);
	const [calenerdate, setDate] = useState(new Date());
	const [data, setdata] = useState([]);
	const [loading, setLoading] = useState(loadingg ?? true);
	const [currr, setCurrr] = useState('');
	const curmomnet = moment().format();

	// Fetch data every time screen comes into focus
	useFocusEffect(
		useCallback(() => {
			setLoading(true);
			FetchResultsWithDate(curmomnet, title, setdata, mode, setLoading);
		}, [title])
	);
	const handleChange = (event, selectedDate) => {
		const curmomnet = selectedDate || calenerdate;
		setShow(false);
		setDate(curmomnet);
		setCurrr(curmomnet);
		setLoading(true);
		FetchResultsWithDate(curmomnet, title, setdata, mode, setLoading);
	};
	const main = currr !== '' ? currr : curmomnet;
	console.log(data);
	return (
		<View style={{ flex: 1, backgroundColor: '#f7d560' }}>
			<View style={styles.header}>
				<Text style={styles.title}>{title}</Text>
				<Pressable onPress={() => setShow(true)}>
					<Text style={styles.dateButton}>
						{moment(calenerdate).format('DD-MM-YYYY')}
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
								<View key={idx}>
									{itex.result
										.filter(
											(iit) => iit.date == moment(main).format('YYYY-MM-DD')
										)
										.map((resItem, resIdx) => {
											return (
												<View>
													{resItem.times.map((itss, isidx) => (
														<View
															key={isidx}
															style={styles.resultRow}>
															<Text style={styles.resultText}>{itss.time}</Text>
															<Text style={styles.resultText}>
																{itss.number}
															</Text>
														</View>
													))}
												</View>
											);
										})}
								</View>
							))}
						</ScrollView>
					) : (
						<ScrollView style={{ marginTop: 10 }}>
							{data?.map((itex, idx) => (
								<View key={idx}>
									{itex.result?.map((resItem, resIdx) => {
										return (
											<View
												key={resIdx}
												style={styles.resultRow}>
												<Text style={styles.resultText}>
													{mode === 'scraper' ? resItem.date : resItem.time}
												</Text>
												<Text style={styles.resultText}>{resItem.number}</Text>
											</View>
										);
									})}
								</View>
							))}
						</ScrollView>
					)}

					{Platform.OS === 'android' && show && (
						<DateTimePicker
							value={calenerdate}
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
										value={calenerdate}
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
		backgroundColor: 'white',
		elevation: 2,
		height: 500,
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
