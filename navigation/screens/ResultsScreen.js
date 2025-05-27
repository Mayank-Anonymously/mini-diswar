import {
	Platform,
	Pressable,
	StyleSheet,
	Text,
	View,
	Modal,
	Button,
	ScrollView,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRoute } from '@react-navigation/native';
import DateTimePicker from '@react-native-community/datetimepicker';
import moment from 'moment';
import FetchResultsWithDate from '../../utils/Apicall/FetchResultsWithDate';

const ResultsScreen = () => {
	const route = useRoute();
	const { title, item, date } = route.params;
	const [show, setShow] = useState(false);
	const [calenerdate, setDate] = useState(new Date());
	const [data, setdata] = useState([]);

	useEffect(() => {
		FetchResultsWithDate(calenerdate, title, setdata);
	}, []);

	console.log(calenerdate);

	const handleChange = (event, selectedDate) => {
		const currentDate = selectedDate || date;
		setShow(false);
		setDate(currentDate);
		FetchResultsWithDate(currentDate, title, setdata);
	};

	return (
		<View style={{ flex: 1, backgroundColor: '#f7d560' }}>
			<View
				style={{
					flexDirection: 'row',
					justifyContent: 'space-between',
					marginHorizontal: 20,
					marginVertical: 20,
					alignItems: 'center',
				}}>
				<Text style={styles.title}>{title}</Text>

				<Pressable onPress={() => setShow(true)}>
					<Text
						style={[
							styles.title,
							{
								backgroundColor: 'darkblue',
								color: 'white',
								padding: 10,
								borderRadius: 10,
							},
						]}>
						{moment(calenerdate).format('DD-MM-YYYY')}
					</Text>
				</Pressable>
			</View>
			<View
				style={{
					backgroundColor: 'white',
					elevation: 2,
					height: 500,
					marginHorizontal: 20,
					padding: 10,
					borderRadius: 10,
				}}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'space-around',
						borderBottomWidth: 1,
						borderBottomColor: 'whitesmoke',
					}}>
					<Text style={{ textAlign: 'center', fontSize: 18 }}>Time</Text>

					<Text style={{ textAlign: 'center', fontSize: 18 }}>Number</Text>
				</View>

				<ScrollView style={{ marginTop: 10 }}>
					{data?.map((itex, idx) => (
						<View key={idx}>
							{itex.result?.map((resItem, resIdx) => (
								<View
									key={resIdx}
									style={{
										flexDirection: 'row',
										justifyContent: 'space-around',
										marginTop: 10,
										borderBottomWidth: 1,
										borderBottomColor: 'whitesmoke',
									}}>
									<Text style={{ textAlign: 'center', fontSize: 18 }}>
										{resItem.time}
									</Text>
									<Text style={{ textAlign: 'center', fontSize: 18 }}>
										{resItem.number}
									</Text>
								</View>
							))}
						</View>
					))}
				</ScrollView>

				{Platform.OS === 'android' && show && (
					<DateTimePicker
						value={new Date()}
						mode='date'
						display='default'
						onChange={(event, selectedDate) => {
							const currentDate = selectedDate || date;
							setDate(currentDate);
							setShow(false);
							FetchResultsWithDate(currentDate, title, setdata);
						}}
					/>
				)}

				{Platform.OS === 'ios' && (
					<Modal
						transparent={true}
						visible={show}
						animationType='slide'
						onRequestClose={() => setShow(false)}>
						<View
							style={{
								flex: 1,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor: 'rgba(0,0,0,0.5)',
							}}>
							<View
								style={{
									backgroundColor: 'white',
									padding: 20,
									borderRadius: 10,
									alignItems: 'center',
								}}>
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
		</View>
	);
};

export default ResultsScreen;

const styles = StyleSheet.create({
	title: {
		fontSize: 25,
		fontWeight: 'bold',
	},
});
