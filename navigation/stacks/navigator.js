import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import d from '../../assets/mini-desawar.png';
import { Image, Pressable, Text, View } from 'react-native';

import { MaterialIcons } from 'react-native-vector-icons';
import ResultsScreen from '../screens/ResultsScreen';
import { useNavigation } from '@react-navigation/native';
const Stack = createNativeStackNavigator();

const StackNavigator = () => {
	const navigation = useNavigation();
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				color: 'white',
			}}>
			<Stack.Screen
				name='Home'
				component={HomeScreen}
				options={({ route }) => ({
					title: 'Mini Diswar Results',
					headerStyle: {
						backgroundColor: '#01796F',
					},
					headerTitleStyle: {
						fontWeight: 'bold',
						color: 'white',
					},

					headerLeft: ({ route }) => (
						<Pressable onPress={() => navigation.openDrawer()}>
							<MaterialIcons
								name='menu'
								size={30}
								style={{ marginRight: 10 }}
								color='white'
							/>
						</Pressable>
					),
					headerRight: ({ route }) => (
						<View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
							<Image
								source={d}
								resizeMode='cover'
								style={{
									resizeMode: 'contain',
									width: 40,
									height: 40,
									marginRight: 10,
								}}
							/>
							<Text style={{ color: 'white' }}>Share</Text>
						</View>
					),
				})}
			/>
			<Stack.Screen
				name='Results'
				component={ResultsScreen}
				options={({ route }) => ({
					headerShown: true,
					headerTitleStyle: {
						fontWeight: 'bold',
						color: 'white',
					},
					headerTitle: () => (
						<View>
							<Text>{route.params?.title}</Text>
						</View>
					),
				})}
			/>
		</Stack.Navigator>
	);
};

export default StackNavigator;
