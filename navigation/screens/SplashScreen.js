import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const SplashScreen = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				padding: 20,
			}}>
			<Text>Welcome to Mini Diswar</Text>
		</View>
	);
};

export default SplashScreen;

const styles = StyleSheet.create({});
