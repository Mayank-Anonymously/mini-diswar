import { Image, StyleSheet, Text, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { fetchallapi } from '../../utils/Apicall/fetchallresults';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
	const navigation = useNavigation();
	const [data, setdata] = useState([]);

	useEffect(() => {
		fetchallapi(setdata);
		navigation.navigate('Home');
	}, []);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: '#f7d560',
			}}>
			<Text style={{ fontSize: 30, fontWeight: 'bold', color: 'white' }}>
				Welcome to Mini Diswar
			</Text>

			<Image
				source={require('../../assets/mini-desawar.png')}
				style={{ height: 240, width: 300 }}
			/>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
