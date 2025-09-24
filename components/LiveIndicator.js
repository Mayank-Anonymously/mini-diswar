import React, { useEffect, useRef } from 'react';
import { View, Text, Animated, StyleSheet } from 'react-native';

const LiveIndicator = () => {
	const blinkAnim = useRef(new Animated.Value(1)).current;

	useEffect(() => {
		const blink = Animated.loop(
			Animated.sequence([
				Animated.timing(blinkAnim, {
					toValue: 0,
					duration: 500,
					useNativeDriver: true,
				}),
				Animated.timing(blinkAnim, {
					toValue: 1,
					duration: 500,
					useNativeDriver: true,
				}),
			])
		);
		blink.start();
		return () => blink.stop();
	}, [blinkAnim]);

	return (
		<View style={styles.container}>
			<Animated.View style={[styles.dot, { opacity: blinkAnim }]} />
			<Text style={styles.text}>LIVE</Text>
		</View>
	);
};

export default LiveIndicator;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	dot: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: 'red',
		marginRight: 6,
	},
	text: {
		color: 'red',
		fontWeight: 'bold',
		fontSize: 16,
	},
});
