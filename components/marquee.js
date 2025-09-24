// components/Marquee.js
import React, { useEffect, useRef } from 'react';
import { Animated, Text, View, StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

const Marquee = ({ text, duration = 8000, style }) => {
	const animatedValue = useRef(new Animated.Value(0)).current;

	useEffect(() => {
		const startAnimation = () => {
			animatedValue.setValue(width);

			Animated.loop(
				Animated.timing(animatedValue, {
					toValue: -width,
					duration,
					useNativeDriver: true,
				})
			).start();
		};

		startAnimation();
	}, [animatedValue, duration]);

	return (
		<View style={styles.container}>
			<Animated.Text
				style={[
					styles.text,
					style,
					{ transform: [{ translateX: animatedValue }] },
				]}
				numberOfLines={1}>
				{text}
			</Animated.Text>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		width: '100%',
		overflow: 'hidden',
	},
	text: {
		fontSize: 16,
		color: '#fff',
		fontWeight: 'bold',
	},
});

export default Marquee;
