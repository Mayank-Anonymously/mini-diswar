// src/screens/HomeScreen.js
import React, { useEffect, useState } from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	Text,
	ImageBackground,
	TouchableOpacity,
	ActivityIndicator,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchResults } from '../../components/redux/slices/resultSlice';
import moment from 'moment';

// Image imports
import mini from '../../assets/tiles/minidisawar.png';
import ghaziabad from '../../assets/tiles/ghaziabad.png';
import delhi from '../../assets/tiles/delhi.png';
import gurgaon from '../../assets/tiles/gurgaon.png';
import ganesh from '../../assets/tiles/ganesh.png';
import faridabad from '../../assets/tiles/faridabad.png';
import desawar from '../../assets/tiles/deshwar.png';
import gali from '../../assets/tiles/gali.png';
import LiveIndicator from '../../components/LiveIndicator';
import { setSelectedResult } from '../../components/redux/slices/selectedResultSlice';
import Marquee from '../../components/marquee';

const momentnow = moment().format('YYYY-MM-DD');

const Item = ({ title, number, next_result, results }) => {
	const [imageLoaded, setImageLoaded] = useState(false);

	const name =
		title === 'Minidiswar'
			? mini
			: title.toLowerCase().includes('delhi')
			? delhi
			: title.toLowerCase().includes('gurgaon')
			? gurgaon
			: title.toLowerCase().includes('ganesh')
			? ganesh
			: title.toLowerCase().includes('faridabad')
			? faridabad
			: title.toLowerCase().includes('desawar')
			? desawar
			: title.toLowerCase().includes('gali')
			? gali
			: title.toLowerCase().includes('ghaziabad')
			? ghaziabad
			: '';

	const result = title === 'Minidiswar' ? results[0] : results;
	return (
		<ImageBackground
			style={styles.item}
			source={name}
			onLoadEnd={() => setImageLoaded(true)}
			imageStyle={{ borderRadius: 10 }}>
			<View style={styles.row}>
				<Text style={styles.title}>{title}</Text>
				{title === 'Minidiswar' && <LiveIndicator />}
			</View>

			{imageLoaded ? (
				<>
					<Text style={styles.number}>
						{title === 'Minidiswar'
							? result?.[result.length - 1]?.number ?? 'XX'
							: result?.[0]?.number ?? 'XX'}
					</Text>

					<Text style={styles.time}>
						{title === 'Minidiswar'
							? result?.[result.length - 1]?.time ?? '--'
							: result?.[0]?.time ?? '--'}
					</Text>

					<View style={styles.nextResultBox}>
						<Text style={styles.nextResultText}>
							Next Result: {next_result}
						</Text>
					</View>
				</>
			) : (
				<View style={styles.loadingView}>
					<ActivityIndicator
						size='small'
						color='#fff'
					/>
				</View>
			)}
		</ImageBackground>
	);
};

const HomeScreen = () => {
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { data, status } = useSelector((state) => state.results);

	useEffect(() => {
		dispatch(fetchResults());

		const interval = setInterval(() => {
			dispatch(fetchResults());
		}, 2000);

		return () => clearInterval(interval);
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<Marquee
					text='Welcome to Minidiswar Results!'
					duration={10000} // adjust speed
				/>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() => {
								dispatch(
									setSelectedResult({
										title: item.categoryname,
										item: item.result,
										date: item.date,
										mode: item.mode,
										loadingg: false,
									})
								);

								navigation.navigate('Results'); // No
							}}>
							<Item
								title={item.categoryname}
								number={item.number}
								next_result={item.next_result}
								results={
									item.categoryname === 'Minidiswar'
										? item.result
												.filter((ite) => ite.date === momentnow)
												.map((it) => it.times)
										: item.result
								}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item._id}
					numColumns={2}
					contentContainerStyle={{ paddingBottom: 30 }}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f7d560',
		padding: 10,
	},
	item: {
		padding: 10,
		margin: 8,
		width: 150,
		height: 150,
		justifyContent: 'space-between',
		borderRadius: 10,
		overflow: 'hidden',
	},
	row: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		alignItems: 'center',
	},
	title: {
		color: 'white',
		fontSize: 12,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	number: {
		color: 'white',
		fontSize: 36,
		textAlign: 'center',
		fontWeight: 'bold',
	},
	time: {
		fontSize: 20,
		fontWeight: 'bold',
		textAlign: 'center',
		color: 'white',
	},
	nextResultBox: {
		backgroundColor: 'yellow',
		borderRadius: 2,
		paddingHorizontal: 2,
	},
	nextResultText: {
		fontSize: 10,
		fontWeight: 'bold',
		textAlign: 'center',
	},
	loadingView: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	loadingScreen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#fff',
	},
});

export default HomeScreen;
