import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import StackNavigator from '../stacks/navigator';
import SettingsScreen from '../screens/settingsScreen';
import { Text, View } from 'react-native';
import CustomDrawer from './custom';
import ResultsScreen from '../screens/ResultsScreen';

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
	return (
		<Drawer.Navigator
			screenOptions={{
				headerShown: false,
				drawerStyle: {
					backgroundColor: '#f7d560',
				},
			}}
			drawerContent={(props) => <CustomDrawer {...props} />}>
			<Drawer.Screen
				name='HomeStack'
				component={StackNavigator}
				options={{
					title: 'Mini Diswar Results',
				}}
			/>
			<Drawer.Screen
				name='Results'
				options={({ route }) => ({
					headerShown: true,
					headerTitle: () => (
						<View>
							<Text>{route.params.title}</Text>
						</View>
					),
				})}
				component={ResultsScreen}
			/>
		</Drawer.Navigator>
	);
};

export default DrawerNavigator;
