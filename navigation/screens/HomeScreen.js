import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import {
	View,
	FlatList,
	StyleSheet,
	Text,
	StatusBar,
	ImageBackground,
	TouchableOpacity,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import {
	fetchallapi,
	fetchallresults,
} from '../../utils/Apicall/fetchallresults';
import moment from 'moment';



const momentnow = moment().format('YYYY-MM-DD');
const Item = ({ title, number, next_result, navigation, results, mode }) => {
	const result = title === 'Minidiswar' ? results[0] : results;
	return (
		<ImageBackground
			style={styles.item}
			source={{
				uri: 'https://images.unsplash.com/photo-1503264116251-35a269479413?fit=crop&w=1050&q=80',
			}}>
			<Text style={styles.title}>{title}</Text>
			<Text style={styles.number}>
				{title === 'Minidiswar'
					? result[result.length  - 1].number
					: result.length === 0
						? "XX"
					: result[0].number}
			</Text>
			<View>
				<Text
					style={{
						fontSize: 20,
						fontWeight: 'bold',
						margin: 1,
						textAlign: 'center',
						color: 'white',
					}}>
					{title === 'Minidiswar'
						? result[result.length  - 1].time
						: result.length === 0
						? '--'
						: result[0].time}
				</Text>
			</View>
			<View style={{ backgroundColor: 'yellow', borderRadius: 2 }}>
				<Text
					style={{
						fontSize: 10,
						fontWeight: 'bold',
						margin: 1,
						textAlign: 'center',
					}}>
					Next Result :{next_result}
				</Text>
			</View>
		</ImageBackground>
	);
};

const HomeScreen = () => {
	const navigation = useNavigation();
	const [data, setdata] = useState([]);

	useEffect(() => {
		fetchallapi(setdata);

		setInterval(() => {
				fetchallapi(setdata);
		}, 2000);
	}, []);

	return (
		<SafeAreaProvider>
			<SafeAreaView style={styles.container}>
				<FlatList
					data={data}
					renderItem={({ item }) => (
						<TouchableOpacity
							onPress={() =>
								navigation.navigate('Results', {
									title: item.categoryname,
									item: item.result,
									date: item.date,
									mode: item.mode,
									loadingg: false,
								})
							}>
							<Item
								title={item.categoryname}
								number={item.number}
								next_result={item.next_result}
								navigation={navigation}
								results={
									item.categoryname === 'Minidiswar'
										? item.result
												.filter((ite) => ite.date === momentnow)
												.map((it) => it.times)
										: item.result
								}
								mode={item.mode}
							/>
						</TouchableOpacity>
					)}
					keyExtractor={(item) => item._id}
					numColumns={2}
				/>
			</SafeAreaView>
		</SafeAreaProvider>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// marginTop: StatusBar.currentHeight || 0,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#f7d560',
		padding: 10,
	},
	item: {
		backgroundColor: '#f9c2ff',
		padding: 10,
		marginVertical: 8,
		marginHorizontal: 16,
		width: 150,
		height: 150,
		justifyContent: 'space-between',
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
});

export default HomeScreen;
